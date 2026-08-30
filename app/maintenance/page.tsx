"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MAINTENANCE_UNTIL =
  process.env.NEXT_PUBLIC_MAINTENANCE_UNTIL ||
  "2026-09-06T18:29:59.000Z";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getTimeLeft(): TimeLeft {
  const difference =
    new Date(MAINTENANCE_UNTIL).getTime() - Date.now();

  if (difference <= 0) {
    return EMPTY_TIME;
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export default function MaintenancePage() {
  /*
   * Start with a deterministic value so the server HTML
   * and the initial client HTML are identical.
   */
  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(EMPTY_TIME);

  useEffect(() => {
    // Calculate the real remaining time only after hydration.
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F1EA] text-neutral-900">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-neutral-900/5 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-14">

        {/* Header */}
        <header className="flex items-center">

          {/* Cosmolix Global Logo */}
          <div className="flex h-16 items-center sm:h-20">
            <img
              src="https://i.ibb.co/KpQsL9Bj/cosmolix-logo.png"
              alt="Cosmolix"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </div>

        </header>

        {/* Center */}
        <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
            We&apos;re building
            <br />

            <span className="relative inline-block">
              something better

              <span className="absolute -bottom-2 left-0 h-1 w-1/3 rounded-full bg-orange-500 sm:-bottom-3 sm:h-1.5" />
            </span>

            <span className="text-orange-500">.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Cosmolix is currently undergoing scheduled maintenance
            as we work behind the scenes to improve your experience.
            We&apos;ll be back shortly.
          </p>

          {/* Countdown */}
          <div className="relative mt-12">

            {/* Ambient countdown glow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.4, 0.75, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating ring */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/5"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Back in */}
            <motion.p
              className="relative z-10 mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400"
              animate={{
                opacity: [0.55, 1, 0.55],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Back in
            </motion.p>

            {/* Countdown blocks */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-4">

              <TimeBlock
                value={timeLeft.days}
                label="Days"
              />

              <Separator />

              <TimeBlock
                value={timeLeft.hours}
                label="Hours"
              />

              <Separator />

              <TimeBlock
                value={timeLeft.minutes}
                label="Minutes"
              />

              <Separator />

              <TimeBlock
                value={timeLeft.seconds}
                label="Seconds"
                highlight
              />

            </div>

          </div>

          {/* Contact */}
          <a
            href="mailto:info@cosmolix.co.in"
            className="group mt-12 inline-flex items-center gap-3 rounded-full border border-neutral-900/10 bg-white/60 px-5 py-3 text-sm text-neutral-600 backdrop-blur-md transition-all duration-300 hover:border-neutral-900/20 hover:bg-white hover:text-neutral-900"
          >
            <Mail className="h-4 w-4" />

            <span>
              Need to reach us{" "}
              <span className="font-medium text-neutral-900">
                Contact Cosmolix
              </span>
            </span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-neutral-900/10 pt-6 text-[10px] uppercase tracking-[0.18em] text-neutral-400 sm:flex-row">

          <p>
            © 2026 Cosmolix Private Limited
          </p>

          <p>
            Beyond Limits
          </p>

        </footer>

      </div>
    </main>
  );
}


/* =========================================================
   COUNTDOWN TIME BLOCK
   ========================================================= */

function TimeBlock({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  const formattedValue = pad(value);

  return (
    <motion.div
      className="group relative min-w-[58px] sm:min-w-[78px]"
      whileHover={{
        y: -5,
        scale: 1.04,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
      }}
    >

      {/* Glow behind seconds */}
      {highlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-orange-500/10 blur-xl"
          animate={{
            opacity: [0.15, 0.45, 0.15],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Number container */}
      <div className="relative overflow-hidden rounded-xl px-1 py-1">

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={formattedValue}
            initial={{
              y: 24,
              opacity: 0,
              filter: "blur(5px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              y: -24,
              opacity: 0,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            {formattedValue}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Animated underline */}
      <motion.div
        className="mx-auto mt-1 h-px rounded-full bg-orange-500/20"
        initial={{ width: 0 }}
        animate={{
          width: highlight ? "45%" : "25%",
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />

      {/* Label */}
      <div className="mt-2 text-[8px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px]">
        {label}
      </div>

    </motion.div>
  );
}


/* =========================================================
   ANIMATED SEPARATOR
   ========================================================= */

function Separator() {
  return (
    <motion.span
      className="mb-6 text-xl font-light text-neutral-300 sm:text-3xl"
      animate={{
        opacity: [0.3, 1, 0.3],
        y: [0, -2, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      :
    </motion.span>
  );
}