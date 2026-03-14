"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb,
  type LucideIcon
} from "lucide-react"

interface AnalysisSectionProps {
  title: string
  items: string[]
  icon: LucideIcon
  variant: "success" | "warning" | "info" | "suggestion"
  delay?: number
}

const variantStyles = {
  success: {
    bg: "bg-success/10",
    border: "border-success/20",
    iconBg: "bg-success/20",
    iconColor: "text-success",
    itemBg: "bg-success/5",
    itemBorder: "border-success/10",
  },
  warning: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    iconBg: "bg-destructive/20",
    iconColor: "text-destructive",
    itemBg: "bg-destructive/5",
    itemBorder: "border-destructive/10",
  },
  info: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    itemBg: "bg-primary/5",
    itemBorder: "border-primary/10",
  },
  suggestion: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    iconBg: "bg-accent/20",
    iconColor: "text-accent",
    itemBg: "bg-accent/5",
    itemBorder: "border-accent/10",
  },
}

export function AnalysisSection({ 
  title, 
  items, 
  icon: Icon, 
  variant, 
  delay = 0 
}: AnalysisSectionProps) {
  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-2xl border p-6",
        styles.bg,
        styles.border
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.1 }}
            className={cn(
              "rounded-xl border p-3",
              styles.itemBg,
              styles.itemBorder
            )}
          >
            <p className="text-sm text-foreground">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Pre-configured section components
export function StrengthsSection({ items, delay }: { items: string[], delay?: number }) {
  return (
    <AnalysisSection
      title="Strengths"
      items={items}
      icon={CheckCircle2}
      variant="success"
      delay={delay}
    />
  )
}

export function WeaknessesSection({ items, delay }: { items: string[], delay?: number }) {
  return (
    <AnalysisSection
      title="Weaknesses"
      items={items}
      icon={AlertTriangle}
      variant="warning"
      delay={delay}
    />
  )
}

export function MarketPotentialSection({ content, delay }: { content: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Market Potential</h3>
      </div>
      <p className="text-foreground/90">{content}</p>
    </motion.div>
  )
}

export function SuggestionsSection({ items, delay }: { items: string[], delay?: number }) {
  return (
    <AnalysisSection
      title="Suggestions"
      items={items}
      icon={Lightbulb}
      variant="suggestion"
      delay={delay}
    />
  )
}
