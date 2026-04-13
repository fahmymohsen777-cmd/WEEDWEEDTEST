"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingInvitation from "@/components/WeddingInvitation";
import type { InvitationData } from "@/types/invitation";

import { INVITATION_DATA } from "@/config";

type AppState = "playing" | "done";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("playing");
  const [hideGif, setHideGif] = useState(false);

  useEffect(() => {
    // 1. Exactly before the GIF hits 8.0s (which causes it to loop back to the envelope)
    // we hide the GIF showing only the static last frame beneath it.
    const freezeTimer = setTimeout(() => {
      setHideGif(true);
    }, 7900);

    // 2. Then we trigger the smooth framer-motion exit transition
    const exitTimer = setTimeout(() => {
      setAppState("done");
    }, 8100);

    return () => {
      clearTimeout(freezeTimer);
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
            transition={{ duration: 1.2 }}
            className="fixed inset-0 flex items-center justify-center bg-[#efece6] overflow-hidden z-50"
          >
            <div className="relative w-full max-w-[430px] h-full sm:h-[90vh] sm:rounded-2xl sm:shadow-2xl overflow-hidden bg-[#efece6] flex items-center justify-center">
              {/* Static Last Frame (always here as fallback) */}
              <img 
                src="/intro_last_frame.png"
                alt="End of Splash"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* The GIF overlay (hidden before it can loop) */}
              {!hideGif && (
                <img 
                  src="/intro.gif"
                  alt="Intro Video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
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
