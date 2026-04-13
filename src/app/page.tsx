"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingInvitation from "@/components/WeddingInvitation";
import type { InvitationData } from "@/types/invitation";

import { INVITATION_DATA } from "@/config";

type AppState = "playing" | "done";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("playing");
  useEffect(() => {
    // Trigger the smooth framer-motion exit transition early enough (7.2s)
    // so it finishes before the 8.0s GIF loop point!
    const exitTimer = setTimeout(() => {
      setAppState("done");
    }, 7200);

    return () => {
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {appState !== "done" ? (
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 flex items-center justify-center bg-[#efece6] overflow-hidden z-50"
          >
            <div className="relative w-full max-w-[430px] h-full sm:h-[90vh] sm:rounded-2xl sm:shadow-2xl overflow-hidden bg-[#efece6] flex items-center justify-center">
              {/* The GIF animation */}
              <img 
                src="/intro.gif"
                alt="Intro Video"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <WeddingInvitation data={INVITATION_DATA} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
