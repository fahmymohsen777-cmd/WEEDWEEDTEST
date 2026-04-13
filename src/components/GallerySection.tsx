"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface GallerySectionProps {
  images: string[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const galleryImgs = images.slice(1, 7);

  return (
    <section id="gallery" className="bg-[#efece6] py-14 px-5" dir="rtl">
      {/* Header */}
      <ScrollReveal direction="fade" className="text-center mb-12">
        <p
          className="text-[#382216]/50 tracking-[0.25em] text-[10px] uppercase mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          ذكرياتنا
        </p>
        <h2
          className="text-[#382216] text-3xl leading-normal"
          style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 400, paddingBottom: "16px", marginBottom: "16px" }}
        >
          لحظات من قلب الحكاية
        </h2>
        <div className="w-10 h-px bg-[#382216]/15 mx-auto" />
      </ScrollReveal>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* First image — full width */}
        {galleryImgs[0] && (
          <ScrollReveal direction="up" delay={0} className="col-span-2">
            <div
              className="relative w-full overflow-hidden rounded-xl border border-[#382216]/10 shadow-sm group"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={galleryImgs[0]}
                alt="لحظة من ألبوم الذكريات"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-[#382216]/0 group-hover:bg-[#382216]/5 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        )}

        {/* Rest — 2 per row */}
        {galleryImgs.slice(1).map((src, idx) => (
          <ScrollReveal
            key={src}
            direction={idx % 2 === 0 ? "right" : "left"}
            delay={0.07 * idx}
          >
            <div
              className="relative overflow-hidden rounded-xl border border-[#382216]/10 shadow-sm group"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={src}
                alt={`ذكرى ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-[#382216]/0 group-hover:bg-[#382216]/5 transition-colors duration-500" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
