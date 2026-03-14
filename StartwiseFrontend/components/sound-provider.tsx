"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface SoundContextType {
  playClick: () => void
  playSuccess: () => void
  isSoundEnabled: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)

  const playClick = useCallback(() => {
    if (!isSoundEnabled) return
    
    // Create a simple click sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.05)
    } catch {
      // Audio not available
    }
  }, [isSoundEnabled])

  const playSuccess = useCallback(() => {
    if (!isSoundEnabled) return
    
    // Create a success sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
      
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5 - major chord arpeggio
      
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = "sine"
        
        const startTime = audioContext.currentTime + index * 0.08
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.02)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

        oscillator.start(startTime)
        oscillator.stop(startTime + 0.2)
      })
    } catch {
      // Audio not available
    }
  }, [isSoundEnabled])

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev)
  }, [])

  return (
    <SoundContext.Provider value={{ playClick, playSuccess, isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
