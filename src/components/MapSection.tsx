"use client";

import ScrollReveal from "./ScrollReveal";

interface MapSectionProps {
  locationUrl: string;
  venueName: string;
  venueAddress: string;
}

export default function MapSection({ locationUrl, venueName, venueAddress }: MapSectionProps) {
  if (!locationUrl) return null;

  return (
    <section id="location" className="bg-[#e8e4db] py-14 px-5" dir="rtl">
      {/* Header */}
      <ScrollReveal direction="up" className="text-center mb-10">
        <p
          className="text-[#382216]/50 tracking-[0.25em] text-[10px] uppercase mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          مكان الحفل
        </p>
        <h2
          className="text-[#382216] text-3xl leading-normal"
          style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 400, paddingBottom: "16px", marginBottom: "16px" }}
        >
          {venueName}
        </h2>
        <p
          className="text-[#382216]/60 text-[13px] leading-relaxed mt-2"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          {venueAddress}
        </p>
        <div className="w-10 h-px bg-[#382216]/15 mx-auto mt-6 mb-4" />
      </ScrollReveal>

      {/* Map embed */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#382216]/10 shadow-[0_12px_30px_rgba(56,34,22,0.1)]">
          <iframe
            src={locationUrl}
            width="100%"
            height="290"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`خريطة ${venueName}`}
          />
          {/* Subtle vignette on map edges */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#e8e4db] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#e8e4db] to-transparent pointer-events-none" />
        </div>
      </ScrollReveal>

      {/* Directions button */}
      <ScrollReveal direction="up" delay={0.25}>
        <div className="flex justify-center mt-7">
          <a
            href={`https://maps.google.com/maps?q=${encodeURIComponent(venueAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-2.5 bg-[#382216] rounded-full text-[#efece6] text-[13px] shadow-lg hover:bg-[#4a2e1d] hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor"/>
            </svg>
            اعرض على الخريطة
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
