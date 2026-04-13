"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units: { label: string; value: number }[] = [
    { label: "يوم",   value: timeLeft.days },
    { label: "ساعة",  value: timeLeft.hours },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ثانية", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="bg-[#e8e4db] py-14 px-5" dir="rtl">
      <ScrollReveal direction="fade" className="text-center">
        {/* Header */}
        <p
          className="text-[#382216]/50 tracking-[0.25em] text-[10px] uppercase mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          العد التنازلي
        </p>
        <h2
          className="text-[#382216] text-3xl leading-normal"
          style={{ fontFamily: "'Aref Ruqaa', serif", fontWeight: 400, paddingBottom: "32px", marginBottom: "16px" }}
        >
          باقي على الفرح
        </h2>

        {/* Timer blocks */}
        <div className="flex items-end justify-center gap-3 flex-row-reverse">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-end gap-3 flex-row-reverse">
              {/* Block */}
              <div
                className="flex flex-col items-center justify-center bg-white border border-[#382216]/10 rounded-xl shadow-sm"
                style={{ width: 68, paddingTop: 16, paddingBottom: 14 }}
              >
                <span
                  className="text-[#382216] text-[2.4rem] leading-none tabular-nums"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                >
                  {mounted ? pad(unit.value) : "00"}
                </span>
                <span
                  className="text-[#382216]/60 text-[11px] mt-2"
                  style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
                >
                  {unit.label}
                </span>
              </div>
              {/* Separator */}
              {i < units.length - 1 && (
                <span className="text-[#382216]/40 text-3xl leading-none mb-5">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Dua */}
        <p
          className="text-[#382216]/50 text-[14px] mt-10 leading-loose"
          style={{ fontFamily: "'Aref Ruqaa', serif" }}
        >
          اللهم بارك لهما وبارك عليهما وجمع بينهما في خير
        </p>
      </ScrollReveal>
    </section>
  );
}
