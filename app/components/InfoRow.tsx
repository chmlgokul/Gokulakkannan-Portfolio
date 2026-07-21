"use client";

/*
  InfoRow.tsx
  ------------------------------------------------------------------
  This is the current upgraded foundation version.

  NOTE:
  The fully redesigned AI Module version (with:
  - Skills VFX / DS-ML submenu
  - Experience VFX / DS-ML submenu
  - Popup windows
  - Center AI console sync
  - Dynamic resume data
  - Project windows
  - Contact actions

  is larger than can be generated in one chat response.

  This file contains the current working foundation and is intended
  to be replaced incrementally with the remaining sections.
*/

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  title: string;
  content: string;
  delay: number;
};

type SectionStatus = {
  loading: string;
  success: string;
};

const STATUS_MESSAGES: Record<string, SectionStatus> = {
  ABOUT: {
    loading: "Initializing Profile...",
    success: "✓ Profile Loaded",
  },
  SKILLS: {
    loading: "Loading AI Modules...",
    success: "✓ Skills Verified",
  },
  PROJECTS: {
    loading: "Scanning Repository...",
    success: "✓ Repository Ready",
  },
  EXPERIENCE: {
    loading: "Loading Career Timeline...",
    success: "✓ Timeline Loaded",
  },
  EDUCATION: {
    loading: "Fetching Academic Records...",
    success: "✓ Records Verified",
  },
  CONTACT: {
    loading: "Opening Communication Channel...",
    success: "✓ Connection Ready",
  },
};

const LOADING_DURATION_MS = 900;
const PROGRESS_TICK_MS = 30;
const PROGRESS_STEP = 100 / (LOADING_DURATION_MS / PROGRESS_TICK_MS);

export default function InfoRow({ title, content, delay }: Props) {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);

  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const grantedTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMessage = useMemo(
    () =>
      STATUS_MESSAGES[title.toUpperCase()] ?? {
        loading: "Initializing Module...",
        success: "✓ Access Granted",
      },
    [title]
  );

  useEffect(() => {
    if (!hover) {
      setLoading(false);
      setGranted(false);
      setTyping(false);
      setDisplayText("");
      setProgress(0);

      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      if (grantedTimerRef.current) clearTimeout(grantedTimerRef.current);
      if (typingRef.current) clearInterval(typingRef.current);
      if (progressRef.current) clearInterval(progressRef.current);

      return;
    }

    setLoading(true);
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + PROGRESS_STEP, 100));
    }, PROGRESS_TICK_MS);

    loadingTimerRef.current = setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current);
      setLoading(false);
      setGranted(true);

      grantedTimerRef.current = setTimeout(() => {
        setGranted(false);
        setTyping(true);

        let i = 0;

        typingRef.current = setInterval(() => {
          setDisplayText(content.slice(0, i + 1));
          i++;

          if (i >= content.length && typingRef.current) {
            clearInterval(typingRef.current);
          }
        }, 18);
      }, 400);
    }, LOADING_DURATION_MS);

    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
      if (grantedTimerRef.current) clearTimeout(grantedTimerRef.current);
      if (typingRef.current) clearInterval(typingRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [hover, content]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex items-start gap-5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Left Button */}
      <motion.div whileHover={{ scale: 1.05 }} className="w-40 flex-shrink-0">
        <div className="h-20 rounded-2xl border-2 border-green-400 flex items-center justify-center text-green-300 cursor-pointer">
          {title}
        </div>
      </motion.div>

      {/* Right Content */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            className="overflow-hidden flex-1"
          >
            <div className="w-full min-h-[240px] rounded-2xl border-2 border-green-400 p-6 text-green-300 overflow-y-auto">
              {loading && (
                <div className="font-mono text-lg">
                  {currentMessage.loading}
                  <div className="mt-3">
                    Progress : {Math.round(progress)}%
                  </div>
                </div>
              )}

              {granted && <div>{currentMessage.success}</div>}

              {typing && (
                <div className="font-mono whitespace-pre-wrap leading-8 text-green-300">
                  {displayText}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}