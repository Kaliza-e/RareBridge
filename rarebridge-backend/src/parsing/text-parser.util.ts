/**
 * text-parser.util.ts
 *
 * Smart parser for raw Google Sheets text fields.
 * Converts messy free-text blobs into clean, structured data
 * that the frontend can render meaningfully.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DiagnosticStep {
  name: string;
  what: string;
  how: string;
  result: string;
}

export interface LifestyleData {
  therapies: string[];
  nutrition: string;
  devices: string[];
  caregiverTips: string[];
  community: string;
  raw: string;
}

export interface ResearchOrg {
  name: string;
  focus: string;
  url: string | null;
}

export interface ParsedFAQ {
  question: string;
  answer: string;
  order: number;
}

export interface ParsedFactMyth {
  statement: string;
  isFact: boolean;
  explanation: string;
  order: number;
}

export interface ParsedSpecialist {
  name: string;
  profession: string;
  specialization: string;
  organization: string;
  location: string;
  contact: string | null;
  publications: string;
  /** Legacy compat fields */
  focus: string;
  why: string;
}

export interface LinkItem {
  url: string;
  label: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip common bullet/number prefixes and trailing punctuation.
 */
function cleanLine(line: string): string {
  return line
    .replace(/^[\s\-\*•·▪▸►→–—>\.\d]+[\.):,\s]*/u, '')
    .replace(/^["'""\u2018\u2019]/u, '')
    .trim();
}

/**
 * Split a text blob into meaningful non-empty lines.
 */
function splitLines(text: string): string[] {
  return text
    .split(/\r?\n|•|▪|▸/)
    .map(l => l.trim())
    .filter(l => l.length > 2);
}

/**
 * Extract all URLs from a text, returning { url, label } pairs where
 * the label is the surrounding text (or the domain if no context).
 */
export function extractLinks(text: string): LinkItem[] {
  if (!text) return [];
  const urlRegex = /(https?:\/\/[^\s,;)\]]+|www\.[^\s,;)\]]+)/gi;
  const items: LinkItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    let rawUrl = match[1].replace(/[.,;)]+$/, ''); // strip trailing punctuation
    const url = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `https://${rawUrl}`;

    let hostname = url;
    try {
      hostname = new URL(url).hostname;
    } catch {
      hostname = rawUrl;
    }

    // Try to grab surrounding text as label (60 chars before URL)
    const before = text.substring(Math.max(0, match.index - 60), match.index).trim();
    const labelMatch = before.match(/([A-Z][^.!?\n]{5,60})$/);
    const label = labelMatch ? labelMatch[1].trim() : hostname;
    items.push({ url, label });
  }
  return items;
}

/**
 * Remove all URLs from text and clean up leftover punctuation.
 */
export function stripLinks(text: string): string {
  return text
    .replace(/(https?:\/\/[^\s,;)\]]+)/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Clean raw text: strip HTML remnants, normalize whitespace, trim.
 */
export function cleanText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<[^>]+>/g, '')          // remove HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ─── Symptoms ─────────────────────────────────────────────────────────────────

/**
 * Parse a symptoms/types-and-symptoms text blob into a clean string[].
 * Handles: bullet chars, newlines, numbered lists, comma-separated lists.
 */
export function parseSymptomsList(text: string): string[] {
  if (!text) return [];

  // If there are explicit line breaks or bullets, split on those
  const hasBullets = /[•▪▸\n]/.test(text);
  const hasNumbered = /^\d+[\.\)]/.test(text.trim());

  let items: string[] = [];

  if (hasBullets || hasNumbered) {
    items = splitLines(text).map(cleanLine).filter(l => l.length > 2);
  } else {
    // Fall back to comma/semicolon split
    items = text
      .split(/[,;]/)
      .map(s => s.trim())
      .filter(s => s.length > 3);
  }

  // Deduplicate and filter out section headers (all-caps short strings)
  const filtered = [...new Set(items.filter(i => i && !/^[A-Z\s]{2,30}:$/.test(i)))];
  return filtered;
}

// ─── Diagnosis ────────────────────────────────────────────────────────────────

/**
 * Parse a diagnosis text blob into structured diagnostic steps.
 *
 * Recognizes patterns like:
 *   "MRI\n•What it is: ...\n•How it works: ...\n•What the result means: ..."
 *   "1. Blood Test\nWhat: ...\nHow: ..."
 *   Plain paragraph (fallback → single step)
 */
export function parseDiagnosticSteps(text: string): DiagnosticStep[] {
  if (!text) return [];

  const steps: DiagnosticStep[] = [];

  // Split into blocks by detecting step headers:
  // - Lines that are short (< 60 chars), capitalized, and not sub-bullets
  const lines = text.split(/\r?\n/);
  const blocks: string[][] = [];
  let currentBlock: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isHeader =
      trimmed.length < 70 &&
      !trimmed.startsWith('•') &&
      !trimmed.startsWith('-') &&
      !trimmed.match(/^(what|how|result|why|when|where)/i) &&
      (trimmed.match(/^[A-Z]/) || trimmed.match(/^\d+[\.\)]/));

    if (isHeader && currentBlock.length > 0) {
      blocks.push(currentBlock);
      currentBlock = [trimmed];
    } else {
      currentBlock.push(trimmed);
    }
  }
  if (currentBlock.length > 0) blocks.push(currentBlock);

  for (const block of blocks) {
    if (!block.length) continue;
    const name = cleanLine(block[0]);
    const rest = block.slice(1).join('\n');

    const whatMatch = rest.match(/(?:what it is|what)[:\-]\s*(.+?)(?=how|result|$)/is);
    const howMatch = rest.match(/(?:how it works|how)[:\-]\s*(.+?)(?=result|what|$)/is);
    const resultMatch = rest.match(/(?:what the result means|result)[:\-]\s*(.+?)$/is);

    // Truncate long descriptions to keep it readable
    const whatText = whatMatch ? cleanText(whatMatch[1]) : cleanText(rest.split('\n')[0] || '');
    const howText = howMatch ? cleanText(howMatch[1]) : '';
    const resultText = resultMatch ? cleanText(resultMatch[1]) : '';

    steps.push({
      name: name || 'Diagnostic Step',
      what: whatText,
      how: howText,
      result: resultText,
    });
  }

  // If no structured steps found, wrap the whole thing as one step
  if (steps.length === 0 && text.trim()) {
    steps.push({
      name: 'Diagnostic Process',
      what: 'Clinical evaluation and diagnostic review',
      how: 'Comprehensive assessment by specialized medical teams',
      result: cleanText(text),
    });
  }

  return steps;
}

// ─── Lifestyle ────────────────────────────────────────────────────────────────

const THERAPY_KEYWORDS = /\b(therapy|therapies|rehabilitation|physical therapy|occupational|speech|pt|ot|treatment plan)\b/i;
const DEVICE_KEYWORDS = /\b(device|devices|equipment|wheelchair|ventilator|feeding tube|aids|assistive|mobility)\b/i;
const NUTRITION_KEYWORDS = /\b(diet|nutrition|food|eating|meal|calorie|supplement|vitamin|avoid|consume)\b/i;
const CAREGIVER_KEYWORDS = /\b(caregiver|carer|family|parent|support|tip|advice|home care|daily routine)\b/i;
const COMMUNITY_KEYWORDS = /\b(community|support group|organisation|organization|foundation|connect|network|peer)\b/i;

/**
 * Parse a lifestyle/daily-support text blob into categorized sub-sections.
 */
export function parseLifestyleSection(text: string): LifestyleData {
  if (!text) {
    return { therapies: [], nutrition: '', devices: [], caregiverTips: [], community: '', raw: '' };
  }

  const lines = splitLines(text);
  const therapies: string[] = [];
  const devices: string[] = [];
  const caregiverTips: string[] = [];
  const nutritionLines: string[] = [];
  const communityLines: string[] = [];
  const otherLines: string[] = [];

  let currentSection = 'other';

  for (const rawLine of lines) {
    const line = cleanLine(rawLine);
    if (!line) continue;

    // Detect section headers
    if (/^(therapies|therapy|treatments?)\s*:?$/i.test(line)) { currentSection = 'therapy'; continue; }
    if (/^(nutrition|diet|eating|food)\s*:?$/i.test(line)) { currentSection = 'nutrition'; continue; }
    if (/^(devices?|equipment|assistive)\s*:?$/i.test(line)) { currentSection = 'device'; continue; }
    if (/^(caregiver|carer|family|tips?|advice)\s*:?$/i.test(line)) { currentSection = 'caregiver'; continue; }
    if (/^(community|support group|organization)\s*:?$/i.test(line)) { currentSection = 'community'; continue; }

    // Classify by keyword if no explicit section
    if (THERAPY_KEYWORDS.test(line) && currentSection === 'other') {
      therapies.push(line);
    } else if (DEVICE_KEYWORDS.test(line) && currentSection === 'other') {
      devices.push(line);
    } else if (NUTRITION_KEYWORDS.test(line) && currentSection === 'other') {
      nutritionLines.push(line);
    } else if (CAREGIVER_KEYWORDS.test(line) && currentSection === 'other') {
      caregiverTips.push(line);
    } else if (COMMUNITY_KEYWORDS.test(line) && currentSection === 'other') {
      communityLines.push(line);
    } else {
      // Follow current explicit section
      if (currentSection === 'therapy') therapies.push(line);
      else if (currentSection === 'nutrition') nutritionLines.push(line);
      else if (currentSection === 'device') devices.push(line);
      else if (currentSection === 'caregiver') caregiverTips.push(line);
      else if (currentSection === 'community') communityLines.push(line);
      else otherLines.push(line);
    }
  }

  const nutrition = nutritionLines.length > 0
    ? nutritionLines.join(' ')
    : otherLines.join(' ');

  return {
    therapies,
    nutrition: cleanText(nutrition),
    devices,
    caregiverTips,
    community: communityLines.join(' '),
    raw: text,
  };
}

// ─── Research / Pharma ────────────────────────────────────────────────────────

/**
 * Parse a research/pharma text blob into `{ name, focus, url }[]`.
 *
 * Recognizes:
 *   - Lines with a URL → name is the preceding text or line header
 *   - Named organizations (contains known keywords)
 *   - Numbered/bulleted blocks
 */
export function parseResearchOrgs(text: string): ResearchOrg[] {
  if (!text) return [];

  const orgs: ResearchOrg[] = [];
  const lines = splitLines(text);

  let currentName = '';
  let currentFocusLines: string[] = [];
  let currentUrl: string | null = null;

  const ORG_KEYWORDS = /\b(institute|foundation|center|centre|hospital|university|pharma|biotech|company|association|society|trial|research|clinic|programme|program)\b/i;

  function flushOrg() {
    if (currentName || currentFocusLines.length > 0) {
      orgs.push({
        name: currentName || 'Research Organization',
        focus: stripLinks(currentFocusLines.join(' ')).trim() || 'Rare disease research',
        url: currentUrl,
      });
    }
    currentName = '';
    currentFocusLines = [];
    currentUrl = null;
  }

  for (const rawLine of lines) {
    const urlMatch = rawLine.match(/(https?:\/\/[^\s,;)\]]+)/i);
    const url = urlMatch ? urlMatch[1].replace(/[.,;)]+$/, '') : null;
    const lineNoUrl = stripLinks(rawLine).trim();
    const cleaned = cleanLine(lineNoUrl);

    if (!cleaned) continue;

    // Detect if this line looks like an org header
    const looksLikeOrgHeader =
      (ORG_KEYWORDS.test(cleaned) && cleaned.length < 100) ||
      /^[A-Z][A-Za-z\s\-,&]+(?:Institute|Foundation|Center|University|Pharma|Biotech|Association|Society)/.test(cleaned);

    if (looksLikeOrgHeader && currentFocusLines.length > 0) {
      flushOrg();
    }

    if (looksLikeOrgHeader && currentName === '') {
      currentName = cleaned;
      if (url) currentUrl = url;
    } else {
      currentFocusLines.push(cleaned);
      if (url && !currentUrl) currentUrl = url;
    }
  }
  flushOrg();

  // If nothing structured was found, try URL-per-line approach
  if (orgs.length === 0) {
    const links = extractLinks(text);
    for (const link of links) {
      orgs.push({ name: link.label, focus: 'Research resource', url: link.url });
    }
  }

  // Final fallback: at least one entry with full text
  if (orgs.length === 0 && text.trim()) {
    orgs.push({
      name: 'Research & Pharma Directory',
      focus: cleanText(text),
      url: null,
    });
  }

  return orgs;
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

/**
 * Parse a raw FAQ text blob into structured Q&A pairs.
 * Handles: Q: / A: prefixes, numbered Q1/Q2, "Question:" / "Answer:" labels,
 * and plain question-sentence detection.
 */
export function parseFaqs(text: string): ParsedFAQ[] {
  if (!text) return [];

  const faqs: ParsedFAQ[] = [];

  // Try to detect explicit Q/A blocks first
  const qaBlockRegex = /(?:Q(?:uestion)?[\s\d]*[:\.\-]|^\d+[\.\)])\s*(.+?)(?:\r?\n|\s{2,})(?:A(?:nswer)?[\s]*[:\.\-]|)\s*(.+?)(?=(?:Q(?:uestion)?[\s\d]*[:\.\-])|^\d+[\.\)]|$)/gims;
  let match: RegExpExecArray | null;
  let matched = false;

  while ((match = qaBlockRegex.exec(text)) !== null) {
    const question = cleanLine(match[1] || '');
    const answer = cleanText(match[2] || '');
    if (question && answer && question.length > 5) {
      faqs.push({ question, answer, order: faqs.length + 1 });
      matched = true;
    }
  }

  if (!matched) {
    // Split by newline, treat "?" endings as questions
    const lines = splitLines(text);
    for (let i = 0; i < lines.length; i++) {
      const line = cleanLine(lines[i]);
      if (line.endsWith('?') && i + 1 < lines.length) {
        const answer = cleanText(lines[i + 1]);
        faqs.push({ question: line, answer, order: faqs.length + 1 });
        i++; // skip answer line
      }
    }
  }

  // If still nothing, wrap whole text as one FAQ
  if (faqs.length === 0 && text.trim().length > 10) {
    faqs.push({
      question: 'What should I know about this condition?',
      answer: cleanText(text),
      order: 1,
    });
  }

  return faqs;
}

// ─── Facts vs Myths ───────────────────────────────────────────────────────────

/**
 * Parse a facts/myths text blob into structured entries with isFact flag.
 *
 * Recognizes:
 *   - Lines starting with "Myth:" or "Fact:"
 *   - TRUE/FALSE / CORRECT/INCORRECT labels
 *   - Implicit myth keywords (e.g. "It is not true that...")
 */
export function parseFactsMyths(text: string): ParsedFactMyth[] {
  if (!text) return [];

  const items: ParsedFactMyth[] = [];
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const isMythLine = /^myth[\s:]/i.test(line) || /\bit is (?:not true|false|a myth)\b/i.test(line);
    const isFactLine = /^fact[\s:]/i.test(line) || /\bit is (?:true|a fact|correct)\b/i.test(line);
    const isTrueLabel = /^(true|correct|fact)\s*$/i.test(line);
    const isFalseLabel = /^(false|incorrect|myth)\s*$/i.test(line);

    if (isMythLine || isFactLine || isTrueLabel || isFalseLabel) {
      const isFact = isFactLine || isTrueLabel;
      const statement = cleanLine(line)
        .replace(/^(myth|fact)[:\s]*/i, '')
        .replace(/^(true|false|correct|incorrect)[:\s]*/i, '')
        .trim();

      // Look ahead for explanation
      let explanation = '';
      if (i + 1 < lines.length && !/^(myth|fact|true|false)/i.test(lines[i + 1])) {
        explanation = cleanText(lines[i + 1]);
        i++;
      }

      if (statement || explanation) {
        items.push({
          statement: statement || explanation,
          isFact,
          explanation: explanation || statement,
          order: items.length + 1,
        });
      }
    } else if (line.length > 10) {
      // Unclassified line — treat as myth (more conservative)
      items.push({
        statement: cleanLine(line),
        isFact: false,
        explanation: cleanLine(line),
        order: items.length + 1,
      });
    }
    i++;
  }

  return items;
}

// ─── Specialists ──────────────────────────────────────────────────────────────

/**
 * Parse a specialists text blob into structured specialist entries.
 *
/**
 * Parse a specialists text blob from Google Sheets.
 *
 * The sheet format uses "Specialist Name:" as the block separator.
 * Each block may contain any of these labeled fields in any order:
 *   Specialist Name:, Profession:, Specialization:, Organization:,
 *   Location:, Contact Information:, Recent Publications:
 *
 * Flow:
 *   Raw text → split on "Specialist Name:" → parse each block's labels → structured objects
 */
export function parseSpecialists(text: string): ParsedSpecialist[] {
  if (!text || typeof text !== 'string') return [];

  // ── Step 1: split the raw text into per-specialist blocks ──────────────────
  // Split on every occurrence of "Specialist Name:" (case-insensitive)
  const blockSeparator = /Specialist\s+Name\s*:/gi;

  // Find all match positions so we can slice the text between them
  const positions: number[] = [];
  let m: RegExpExecArray | null;
  const separatorRe = new RegExp(blockSeparator.source, 'gi');
  while ((m = separatorRe.exec(text)) !== null) {
    positions.push(m.index);
  }

  if (positions.length === 0) {
    // No "Specialist Name:" found — fall back to legacy parsing
    return parseSpecialistsLegacy(text);
  }

  const results: ParsedSpecialist[] = [];

  for (let i = 0; i < positions.length; i++) {
    // Grab everything from "Specialist Name:" up to the next one (or end of string)
    const blockStart = positions[i];
    const blockEnd = i + 1 < positions.length ? positions[i + 1] : text.length;
    const block = text.slice(blockStart, blockEnd);

    const specialist = parseSpecialistBlock(block);
    if (specialist) results.push(specialist);
  }

  return results;
}

/**
 * Parse a single specialist block (starting with "Specialist Name:").
 * Matches each known label and extracts the value up to the next label or end.
 */
function parseSpecialistBlock(block: string): ParsedSpecialist | null {
  // Labels we recognise, in a safe order for extraction
  const LABELS: { key: keyof RawSpecialistFields; patterns: string[] }[] = [
    { key: 'name', patterns: ['Specialist Name'] },
    { key: 'profession', patterns: ['Profession'] },
    { key: 'specialization', patterns: ['Specialization'] },
    { key: 'organization', patterns: ['Organization'] },
    { key: 'location', patterns: ['Location'] },
    { key: 'contact', patterns: ['Contact Information', 'Contact'] },
    { key: 'publications', patterns: ['Recent Publications', 'Publications'] },
  ];

  // Build a regex that matches any label followed by optional whitespace and colon
  const allPatterns = LABELS.flatMap(l => l.patterns).join('|');
  const labelRe = new RegExp(`(${allPatterns})\\s*:`, 'gi');

  // Find positions of every label occurrence inside this block
  interface LabelPos { key: keyof RawSpecialistFields; start: number; valueStart: number }
  const found: LabelPos[] = [];
  let lm: RegExpExecArray | null;
  while ((lm = labelRe.exec(block)) !== null) {
    const matched = lm[1].trim();
    // Resolve which key this matched pattern belongs to
    const labelDef = LABELS.find(l =>
      l.patterns.some(p => p.toLowerCase() === matched.toLowerCase())
    );
    if (labelDef) {
      found.push({ key: labelDef.key, start: lm.index, valueStart: lm.index + lm[0].length });
    }
  }

  if (found.length === 0) return null;

  const fields: RawSpecialistFields = {};

  for (let i = 0; i < found.length; i++) {
    const { key, valueStart } = found[i];
    const valueEnd = i + 1 < found.length ? found[i + 1].start : block.length;
    const raw = block.slice(valueStart, valueEnd).trim();
    // Collapse newlines and extra whitespace
    fields[key] = raw.replace(/\s*[\r\n]+\s*/g, ' ').trim();
  }

  // Must have at least a name to be a valid record
  const name = fields.name?.trim();
  if (!name) return null;

  return {
    name,
    profession: fields.profession || '',
    specialization: fields.specialization || '',
    organization: fields.organization || '',
    location: fields.location || '',
    contact: fields.contact || null,
    publications: fields.publications || '',
    // Legacy fields kept for backward compat with existing frontend
    focus: fields.specialization || fields.profession || 'Rare Disease Specialist',
    why: name,
  };
}

interface RawSpecialistFields {
  name?: string;
  profession?: string;
  specialization?: string;
  organization?: string;
  location?: string;
  contact?: string;
  publications?: string;
}

/**
 * Legacy fallback for text not using "Specialist Name:" blocks.
 * Handles pipe-separated, Dr.-prefixed, or free-text lines.
 */
function parseSpecialistsLegacy(text: string): ParsedSpecialist[] {
  const results: ParsedSpecialist[] = [];
  const lines = splitLines(text);

  for (const rawLine of lines) {
    const line = cleanLine(rawLine);
    if (!line || line.length < 4) continue;

    const pipeParts = line.split(/\s*\|\s*/);
    if (pipeParts.length >= 2) {
      results.push({
        name: pipeParts[0]?.trim() || 'Specialist',
        profession: '', specialization: '', publications: '',
        organization: pipeParts[1]?.trim() || '',
        location: pipeParts[2]?.trim() || '',
        contact: null,
        focus: pipeParts[3]?.trim() || 'Rare Disease Specialist',
        why: line,
      });
      continue;
    }

    const commaParts = line.split(/\s*[,\-]\s*/).filter(Boolean);
    if (commaParts.length >= 2 && /^Dr\.?/i.test(commaParts[0])) {
      results.push({
        name: commaParts[0]?.trim() || 'Specialist',
        profession: '', specialization: '', publications: '',
        organization: commaParts[1]?.trim() || '',
        location: commaParts[2]?.trim() || '',
        contact: null,
        focus: commaParts[3]?.trim() || 'Rare Disease Specialist',
        why: line,
      });
      continue;
    }
  }

  return results;
}


// ─── Sources ──────────────────────────────────────────────────────────────────

/**
 * Parse a sources text blob into structured source entries.
 */
export function parseSources(text: string): { title: string; url: string | null; type: string; description: string }[] {
  if (!text) return [];

  const sources: { title: string; url: string | null; type: string; description: string }[] = [];
  const lines = splitLines(text);

  for (const rawLine of lines) {
    const urlMatch = rawLine.match(/(https?:\/\/[^\s,;)\]]+)/i);
    const url = urlMatch ? urlMatch[1].replace(/[.,;)]+$/, '') : null;
    const textPart = stripLinks(rawLine).trim();
    const title = cleanLine(textPart) || (url ? new URL(url).hostname : 'Reference');

    let type = 'Reference';
    if (/pubmed|journal|doi|\.org\/pmc/i.test(rawLine)) type = 'Research Paper';
    else if (/clinicaltrial/i.test(rawLine)) type = 'Clinical Trial';
    else if (/nih\.gov|who\.int|cdc\.gov/i.test(rawLine)) type = 'Medical Authority';
    else if (/foundation|society|association/i.test(rawLine)) type = 'Patient Organization';

    sources.push({ title, url, type, description: cleanText(textPart) });
  }

  return sources;
}
