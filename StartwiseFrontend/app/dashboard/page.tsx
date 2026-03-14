"use client"

import { motion } from "framer-motion"
import { Brain, History, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { IdeaForm } from "@/components/idea-form"

const quickStats = [
  { icon: Brain, label: "Ideas Analyzed", value: "0", color: "text-primary" },
  { icon: TrendingUp, label: "Avg Score", value: "--", color: "text-success" },
  { icon: Zap, label: "Best Score", value: "--", color: "text-warning" },
  { icon: History, label: "This Week", value: "0", color: "text-accent" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Startup Idea Validator</h1>
        <p className="mt-2 text-muted-foreground">
          Submit your startup idea to get AI-powered validation and insights.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="glass-card rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main content grid */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Idea Form */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-2xl p-6">
            <IdeaForm />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Ideas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Ideas</h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50">
                <History className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No ideas analyzed yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Submit your first idea to get started
              </p>
            </div>
          </motion.div>

          {/* Tips Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-foreground">Pro Tips</h3>
            <ul className="space-y-3">
              {[
                "Be specific about your target audience",
                "Include your unique value proposition",
                "Mention the problem you're solving",
                "Consider your revenue model",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    {index + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* View History Link */}
          <Link href="/dashboard/history">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
            >
              <span className="font-medium text-foreground">View All History</span>
              <History className="h-5 w-5 text-primary" />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}
