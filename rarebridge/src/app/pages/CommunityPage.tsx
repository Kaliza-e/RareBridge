import React from "react";
import { Users, MessageCircle, Microscope } from "lucide-react";
import { ZebraMascot, ZebraDoodle } from "../components/common/Visuals";

export default function CommunityPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#E7E2CE] p-10 mb-10 border border-[#BEB7A7]/50">
        <div className="absolute left-6 top-6 opacity-10 pointer-events-none"><ZebraDoodle className="w-48 h-32" /></div>
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none"><ZebraMascot size={140} /></div>
        <div className="relative text-center">
          <h1 className="font-black text-3xl text-[#112250] mb-4">Community Support</h1>
          <p className="text-[#3B507D] max-w-3xl mx-auto">Discover groups, forums, and family networks built for rare disease journeys.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        {[
          { title: "Support Groups", description: "Local and online groups where families share advice, resources, and encouragement.", icon: Users },
          { title: "Caregiver Resources", description: "Practical tools, self-care tips, and help navigating medical appointments.", icon: MessageCircle },
          { title: "Research Networks", description: "Patient-led networks that support clinical trial awareness and advocacy.", icon: Microscope },
        ].map(item => (
          <div key={item.title} className="relative overflow-hidden rounded-3xl border border-[#E7E2CE] bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#E7E2CE]/30 blur-2xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 text-[#3B507D]">
                <item.icon className="w-4 h-4" />
                <h3 className="font-bold text-[#112250] mb-0">{item.title}</h3>
              </div>
              <p className="text-sm text-[#3B507D] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-[#E7E2CE] bg-white p-8 shadow-sm">
        <div className="pointer-events-none absolute -right-8 bottom-8 h-24 w-24 rounded-full bg-[#E7E2CE]/20 blur-2xl" />
        <h2 className="font-black text-2xl text-[#112250] mb-4">Connect with others</h2>
        <p className="text-[#3B507D] leading-relaxed mb-6">Whether you are caring for a child, living with a rare disease, or supporting a family member, community connections make the journey easier.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-[#F5F4F0] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-bold text-[#112250] mb-2">Live events</h3>
            <p className="text-sm text-[#3B507D]">Webinars, Q&amp;As, and support circles with experts and families.</p>
          </div>
          <div className="rounded-3xl bg-[#F5F4F0] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-bold text-[#112250] mb-2">Private forums</h3>
            <p className="text-sm text-[#3B507D]">Safe spaces to ask questions, share wins, and exchange resources.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
