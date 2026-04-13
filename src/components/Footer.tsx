"use client";

import ScrollReveal from "./ScrollReveal";

interface FooterProps {
  groomName: string;
  brideName: string;
}

export default function Footer({ groomName, brideName }: FooterProps) {
  return (
    <footer className="bg-[#efece6] py-20 px-6 border-t border-[#382216]/10" dir="rtl">
      <ScrollReveal direction="fade" className="text-center">
        {/* Heart ornament */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#382216]/15" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21C12 21 3 14.5 3 9C3 6.23858 5.23858 4 8 4C9.65685 4 11.1569 4.76837 12 6C12.8431 4.76837 14.3431 4 16 4C18.7614 4 21 6.23858 21 9C21 14.5 12 21 12 21Z"
              fill="#382216"
              fillOpacity="0.1"
              stroke="#382216"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="h-px w-12 bg-[#382216]/15" />
        </div>

        {/* Main message - Calligraphy font */}
        <p
          className="text-[#382216] text-[2.2rem] leading-normal"
          style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 400, paddingBottom: "32px", marginBottom: "16px" }}
        >
          نتمنى نشوفكم معانا 🌹
        </p>

        {/* Names */}
        <p
          className="text-[#382216]/60 text-lg mb-8"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          {groomName} &amp; {brideName}
        </p>

        {/* Dua */}
        <p
          className="text-[#382216]/40 text-[13px] leading-loose"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          اللهم بارك لهما وبارك عليهما
          <br />
          وجمع بينهما في خير
        </p>

        {/* Bottom stamp */}
        <p
          className="text-[#382216]/30 text-[10px] tracking-widest mt-12"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          © {new Date().getFullYear()} — Made with love
        </p>
      </ScrollReveal>
    </footer>
  );
}
