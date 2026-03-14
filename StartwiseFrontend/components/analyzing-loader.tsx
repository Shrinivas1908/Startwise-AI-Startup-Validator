"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

export function AnalyzingLoader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      {/* Animated brain icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-8"
      >
        {/* Glow rings */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/30"
        />
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
        
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_40px_rgba(94,234,212,0.4)]">
          <Brain className="h-12 w-12 text-primary-foreground" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-xl font-semibold text-foreground"
      >
        Analyzing your startup idea...
      </motion.h3>

      {/* Progress bar */}
      <div className="w-64 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-2 w-1/2 rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
        />
      </div>

      {/* Analysis steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 space-y-2 text-center text-sm text-muted-foreground"
      >
        {[
          "Analyzing market trends...",
          "Evaluating competition...",
          "Calculating viability score...",
          "Generating insights...",
        ].map((step, index) => (
          <motion.p
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              delay: index * 0.75,
              repeat: Infinity,
              repeatDelay: 2.25,
            }}
            className="absolute"
            style={{ position: index === 0 ? "relative" : "absolute" }}
          >
            {step}
          </motion.p>
        ))}
      </motion.div>
    </div>
  )
}
