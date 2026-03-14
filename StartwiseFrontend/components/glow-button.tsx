"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { forwardRef, useCallback } from "react"

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

// Simple click sound using Web Audio API
const playClickSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.05)
  } catch {
    // Audio not available
  }
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, ...props }, ref) => {
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      playClickSound()
      onClick?.(e)
    }, [onClick])

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          variant === "primary" && [
            "bg-gradient-to-r from-primary to-accent text-primary-foreground",
            "shadow-[0_0_20px_rgba(94,234,212,0.3)]",
            "hover:shadow-[0_0_30px_rgba(94,234,212,0.5)]",
          ],
          variant === "secondary" && [
            "glass border border-border text-foreground",
            "hover:border-primary/50 hover:shadow-[0_0_15px_rgba(94,234,212,0.2)]",
          ],
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    )
  }
)

GlowButton.displayName = "GlowButton"
