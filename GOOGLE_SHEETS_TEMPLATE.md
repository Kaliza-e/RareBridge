# Google Sheets Data Organization Guide

## Current Issues Found in Your Sheet
Based on the import analysis, here are the specific problems with your current Google Sheet:

### ❌ Missing Core Fields (Required)
These diseases failed to import because they're missing essential information:

1. **Batten Disease** - Missing `Category` field
2. **Amyotrophic Lateral Sclerosis (ALS)** - Missing `Overview` field  
3. **CHOLANGIOCARCINOMA** - Missing `Category` field

### ❌ Data Organization Issues
- Diagnosis field contains multiple procedures mixed together (Biopsy, MRI, CT, PET all in one cell)
- Lifestyle field has unstructured text with therapies, nutrition, and daily care mixed
- Research field has organization info but not clearly separated
- Symptoms are in long text blocks instead of lists
- FAQs, myths, and specialists are empty (should use separate sheets)

### ✅ Import Results
- **5 diseases successfully imported** with improved data parsing
- **3 diseases failed** due to missing core required fields
- Data is now being cleaned and truncated to reasonable lengths

## Recommended Google Sheets Structure

### Sheet 1: Disease Information (Main Sheet)
**Columns (A-M):**
1. **Disease No.** - Unique identifier (1, 2, 3...)
2. **Disease Name** - Full disease name
3. **Category** - Single category (e.g., "Genetic", "Neurological")
4. **Overview** - Brief description (1-2 sentences)
5. **Causes** - Genetic/environmental causes
6. **Types and Symptoms** - List of symptoms (one per line)
7. **Diagnosis** - Brief diagnostic process description
8. **Lifestyle and Daily Support + Community** - Support information
9. **Research and Pharma Directory** - Research organizations
10. **FAQs for a Disease** - Leave empty (use Sheet 2)
11. **Facts vs. Myths** - Leave empty (use Sheet 3)
12. **Specialist Directory** - Leave empty (use Sheet 4)
13. **Sources** - Leave empty (use Sheet 5)

### Sheet 2: FAQs
**Columns (A-C):**
1. **Disease No.** - Reference to main sheet
2. **Question** - FAQ question
3. **Answer** - FAQ answer

### Sheet 3: Facts vs Myths
**Columns (A-D):**
1. **Disease No.** - Reference to main sheet
2. **Statement** - The myth/statement
3. **Is Fact** - TRUE/FALSE
4. **Explanation** - Explanation

### Sheet 4: Specialists
**Columns (A-F):**
1. **Disease No.** - Reference to main sheet
2. **Name** - Specialist name
3. **Organization** - Hospital/institution
4. **Location** - City, State
5. **Focus** - Specialization area
6. **Why** - Why follow them

### Sheet 5: Sources
**Columns (A-E):**
1. **Disease No.** - Reference to main sheet
2. **Title** - Source title
3. **URL** - Link to source
4. **Type** - Article, paper, website
5. **Description** - Brief description

## Data Entry Guidelines

### Overview
- Keep it concise: 1-2 sentences maximum
- Focus on what the disease is, not treatment
- Example: "Angiosarcoma is a rare cancer that develops in the inner lining of blood vessels."

### Causes
- Separate genetic and environmental causes
- Use clear, simple language
- Example: "Genetic mutations in blood vessel cells. No known environmental triggers."

### Types and Symptoms
- List one symptom per line
- Use bullet points or line breaks
- Example:
  ```
  Purple/red skin patches
  Swelling in affected area
  Pain or tenderness
  ```

### Diagnosis
- Brief description of the diagnostic process
- Don't list multiple procedures in detail
- Example: "Diagnosis involves imaging tests (MRI, CT) followed by biopsy to confirm the cancer type."

### Lifestyle and Daily Support
- Focus on practical support
- Include therapies, nutrition, devices
- Keep it organized with clear sections

### Research and Pharma Directory
- List organizations with their focus
- Include website links if available
- Brief description of their work

## Common Mistakes to Avoid

1. **Mixing multiple procedures in diagnosis field**
   - ❌ "Biopsy •What it is:... •How it works:... MRI •What it is:..."
   - ✅ "Diagnosis involves imaging tests followed by biopsy confirmation."

2. **Putting FAQs in the main sheet**
   - ❌ Large text block with Q&A mixed together
   - ✅ Use separate FAQ sheet with structured rows

3. **Missing disease numbers**
   - Always include Disease No. to link related data
   - Use consistent numbering (1, 2, 3...)

4. **Inconsistent categories**
   - Use single words or short phrases
   - Be consistent across all diseases

5. **Empty required fields**
   - All main fields (A-I) should have content
   - Empty fields cause import failures

## Data Quality Checklist

Before importing, verify:
- [ ] Each disease has a unique Disease No.
- [ ] Disease Name is complete and accurate
- [ ] Category is consistent with other diseases
- [ ] Overview is concise (1-2 sentences)
- [ ] Causes are clearly explained
- [ ] Symptoms are listed one per line
- [ ] Diagnosis is brief and clear
- [ ] Lifestyle support is practical
- [ ] Research info includes organization names
- [ ] No empty required fields
- [ ] Related sheets use correct Disease No.

## Import Process

1. Clean up the Google Sheet following this structure
2. Update the import range to include all sheets
3. Run the import process
4. Check for validation errors
5. Fix any missing or inconsistent data
6. Re-import if needed
