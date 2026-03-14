"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { History, Plus, Search } from "lucide-react"
import Link from "next/link"
import { IdeaHistoryCard } from "@/components/idea-history-card"
import { GlowButton } from "@/components/glow-button"
import { cn } from "@/lib/utils"

// Demo data - in production this would come from API
const demoIdeas = [
  {
    id: "1",
    title: "AI-Powered Recipe Generator",
    score: 78,
    createdAt: "Mar 14, 2026",
    market: "Home cooks, busy professionals",
  },
  {
    id: "2",
    title: "Sustainable Fashion Marketplace",
    score: 65,
    createdAt: "Mar 12, 2026",
    market: "Eco-conscious millennials",
  },
  {
    id: "3",
    title: "Virtual Fitness Coach App",
    score: 82,
    createdAt: "Mar 10, 2026",
    market: "Health-conscious adults",
  },
  {
    id: "4",
    title: "Local Service Discovery Platform",
    score: 45,
    createdAt: "Mar 8, 2026",
    market: "Homeowners, local businesses",
  },
]

export default function HistoryPage() {
  const [ideas, setIdeas] = useState(demoIdeas)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "strong" | "moderate" | "weak">("all")

  const handleDelete = (id: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.market.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === "all") return matchesSearch
    if (filter === "strong") return matchesSearch && idea.score >= 70
    if (filter === "moderate") return matchesSearch && idea.score >= 40 && idea.score < 70
    if (filter === "weak") return matchesSearch && idea.score < 40
    return matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Idea History</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage all your analyzed startup ideas.
          </p>
        </div>

        <Link href="/dashboard/analyze">
          <GlowButton>
            <Plus className="mr-2 h-4 w-4" />
            New Analysis
          </GlowButton>
        </Link>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full rounded-xl border border-border bg-input py-3 pl-11 pr-4",
              "text-foreground placeholder:text-muted-foreground",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              "transition-all duration-200"
            )}
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2">
          {(["all", "strong", "moderate", "weak"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                filter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(94,234,212,0.3)]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Ideas Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredIdeas.map((idea, index) => (
            <IdeaHistoryCard
              key={idea.id}
              {...idea}
              onDelete={handleDelete}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/50">
            <History className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {searchQuery || filter !== "all" ? "No matching ideas found" : "No ideas yet"}
          </h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filters."
              : "Start by analyzing your first startup idea to see it appear here."}
          </p>
          {!searchQuery && filter === "all" && (
            <Link href="/dashboard/analyze" className="mt-6">
              <GlowButton>
                <Plus className="mr-2 h-4 w-4" />
                Analyze First Idea
              </GlowButton>
            </Link>
          )}
        </motion.div>
      )}

      {/* Stats Summary */}
      {ideas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Summary</h3>
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{ideas.length}</p>
              <p className="text-sm text-muted-foreground">Total Ideas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {ideas.filter((i) => i.score >= 70).length}
              </p>
              <p className="text-sm text-muted-foreground">Strong Ideas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(ideas.reduce((acc, i) => acc + i.score, 0) / ideas.length)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {Math.max(...ideas.map((i) => i.score))}
              </p>
              <p className="text-sm text-muted-foreground">Best Score</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
