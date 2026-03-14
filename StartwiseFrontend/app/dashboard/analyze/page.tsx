"use client"

import { motion } from "framer-motion"
import { IdeaForm } from "@/components/idea-form"

export default function AnalyzePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Analyze New Idea</h1>
        <p className="mt-2 text-muted-foreground">
          Submit your startup concept for comprehensive AI analysis.
        </p>
      </motion.div>

      <div className="glass-card rounded-2xl p-8">
        <IdeaForm />
      </div>
    </div>
  )
}
