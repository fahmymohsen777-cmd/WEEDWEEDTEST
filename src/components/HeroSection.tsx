"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  date: string;
  heroImage: string;
}

export default function HeroSection({
  groomName,
  brideName,
  date,
  heroImage,
}: HeroSectionProps) {
  const d = new Date(date);
  const toArabicNumerals = (n: number) =>
    String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);

  const arabicMonths = [
    "يناير","فبراير","مارس","أبريل","مايو","يونيو",
    "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
  ];

  const day       = toArabicNumerals(d.getDate());
  const monthName = arabicMonths[d.getMonth()];
  const year      = toArabicNumerals(d.getFullYear());

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start bg-transparent overflow-x-hidden"
      dir="rtl"
    >
      {/* Ambient soft glow — dark brown tint instead of gold */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(56, 34, 22, 0.03) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Top decorative line ── */}
      <motion.div
        className="w-full flex items-center justify-center pt-10 pb-1 gap-3 px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      >
        <div className="flex-1 h-px bg-[#382216]/15" />
        <span className="text-[#382216]/40 text-[10px]">✦</span>
        <div className="flex-1 h-px bg-[#382216]/15" />
      </motion.div>

      {/* Bismillah */}
      <motion.p
        className="text-[#382216]/40 text-[11px] mt-3 tracking-wide"
        style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </motion.p>

      {/* ── Top text block ── */}
      <div className="flex flex-col items-center text-center px-8 pt-6 pb-8 z-10 w-full">
        {/* Sub-label */}
        <motion.p
          className="text-[#382216]/50 tracking-[0.3em] text-[10px] uppercase mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }} // Mixed English serif for elegance
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          دعوة زفاف
        </motion.p>

        {/* Couple Names - Using Aref Ruqaa to match the handwritten script vibe */}
        <motion.h1
          className="text-[#382216] leading-snug mb-5"
          style={{
            fontFamily: "'Aref Ruqaa', serif",
            fontSize: "clamp(2.8rem, 11vw, 4.4rem)",
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {groomName} &amp; {brideName}
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-[#382216]/80 tracking-wide"
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          {day} {monthName} {year}م
        </motion.p>
      </div>

      {/* ── Framed couple photo ── */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full px-8 mt-2"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Back shadow frame - pale soft brown */}
        <div
          className="absolute"
          style={{
            width: "min(74vw, 290px)",
            aspectRatio: "3/4",
            border: "1.5px solid #d2c8be",
            borderRadius: 4,
            transform: "rotate(-4deg) translateY(10px)",
            opacity: 0.8,
          }}
        />

        {/* Main photo frame */}
        <div
          className="relative overflow-hidden shadow-[0_20px_50px_rgba(56,34,22,0.15)] bg-white"
          style={{
            width: "min(74vw, 290px)",
            aspectRatio: "3/4",
            border: "2px solid #382216", // match text color
            borderRadius: 4,
          }}
        >
          <Image
            src={heroImage}
            alt={`${groomName} و ${brideName}`}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 480px) 74vw, 290px"
          />
        </div>
      </motion.div>

      {/* ── Scroll down ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-2 pt-14 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span
          className="text-[#382216]/50 text-[11px] tracking-wide"
          style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
        >
          اسكرول للأسفل
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg width="22" height="14" viewBox="0 0 31 19.666" fill="none">
            <path d="M1.25 1.25L15.5 16.5L29.75 1.25" stroke="#382216" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
