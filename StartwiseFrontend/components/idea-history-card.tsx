"use client"

import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"

interface IdeaHistoryCardProps {
  id: string
  title: string
  score: number
  createdAt: string
  market?: string
  delay?: number
  onDelete: (id: string) => void
}

export function IdeaHistoryCard({
  id,
  title,
  score,
  createdAt,
  market,
  delay = 0,
  onDelete
}: IdeaHistoryCardProps) {

  const getScoreColor = () => {
    if (score >= 70) return "text-green-400"
    if (score >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card rounded-xl p-6 flex justify-between items-start"
    >

      <div className="space-y-2">

        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {market}
        </p>

        <p className="text-xs text-muted-foreground">
          {createdAt}
        </p>

        <p className={`text-sm font-semibold ${getScoreColor()}`}>
          Score: {score}/100
        </p>

      </div>


      <button
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>

    </motion.div>

  )

}