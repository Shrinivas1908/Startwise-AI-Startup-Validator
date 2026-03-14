"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScoreMeterProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function ScoreMeter({ score, size = "lg" }: ScoreMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return { stroke: "#22c55e", glow: "rgba(34, 197, 94, 0.4)" }
    if (score >= 40) return { stroke: "#eab308", glow: "rgba(234, 179, 8, 0.4)" }
    return { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" }
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Strong"
    if (score >= 50) return "Moderate"
    if (score >= 40) return "Needs Work"
    return "Weak"
  }

  const colors = getScoreColor(score)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-32 w-32",
    lg: "h-48 w-48",
  }

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  }

  return (
    <div className={cn("relative", sizeClasses[size])}>
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: colors.glow }}
      />
      
      <svg
        className="relative -rotate-90 transform"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted/30"
        />
        
        {/* Score circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{
            filter: `drop-shadow(0 0 6px ${colors.glow})`,
          }}
        />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className={cn("font-bold text-foreground", textSizes[size])}
        >
          {score}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-xs text-muted-foreground"
        >
          / 100
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-1 text-sm font-medium"
          style={{ color: colors.stroke }}
        >
          {getScoreLabel(score)}
        </motion.span>
      </div>
    </div>
  )
}
