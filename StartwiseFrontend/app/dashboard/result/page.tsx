"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { jsPDF } from "jspdf"

import { ScoreMeter } from "@/components/score-meter"
import {
  StrengthsSection,
  WeaknessesSection,
  MarketPotentialSection,
  SuggestionsSection
} from "@/components/analysis-sections"

import { GlowButton } from "@/components/glow-button"
import { AnalyzingLoader } from "@/components/analyzing-loader"

interface AnalysisResult {
  validationScore: number
  strengths: string[]
  weaknesses: string[]
  marketPotential: string
  suggestions: string[]
}

export default function ResultPage() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [ideaTitle, setIdeaTitle] = useState("")

  useEffect(() => {

    const storedIdea = sessionStorage.getItem("currentIdea")
    const storedAnalysis = sessionStorage.getItem("analysisResult")

    if (!storedIdea || !storedAnalysis) {
      router.push("/dashboard")
      return
    }

    const idea = JSON.parse(storedIdea)
    const result = JSON.parse(storedAnalysis)

    setIdeaTitle(idea.title)
    setAnalysis(result)

    setIsLoading(false)

  }, [router])


  // EXPORT PDF FUNCTION
  const exportAnalysis = () => {

    if (!analysis) return

    const doc = new jsPDF()

    const text = `
Startup Idea Analysis

Title: ${ideaTitle}

Validation Score: ${analysis.validationScore}/100


Strengths
${analysis.strengths.map(s => "- " + s).join("\n")}


Weaknesses
${analysis.weaknesses.map(w => "- " + w).join("\n")}


Market Potential
${analysis.marketPotential}


Suggestions
${analysis.suggestions.map(s => "- " + s).join("\n")}
`

    const lines = doc.splitTextToSize(text, 180)

    doc.text(lines, 10, 10)

    doc.save("startup-analysis.pdf")

  }


  // SHARE FUNCTION
  const shareAnalysis = async () => {

    if (!analysis) return

    const text = `Startup Idea Analysis

Title: ${ideaTitle}

Score: ${analysis.validationScore}/100

Strengths:
${analysis.strengths.join("\n")}

Weaknesses:
${analysis.weaknesses.join("\n")}

Market Potential:
${analysis.marketPotential}
`

    if (navigator.share) {

      await navigator.share({
        title: "Startup Idea Analysis",
        text
      })

    } else {

      await navigator.clipboard.writeText(text)
      alert("Analysis copied to clipboard!")

    }

  }


  if (isLoading) {
    return <AnalyzingLoader />
  }

  if (!analysis) {
    return null
  }


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

          <Link
            href="/dashboard"
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >

            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard

          </Link>

          <h1 className="text-3xl font-bold text-foreground">
            Analysis Results
          </h1>

          <p className="mt-1 text-muted-foreground">
            {ideaTitle}
          </p>

        </div>


        <div className="flex gap-3">

          <GlowButton variant="secondary" size="sm" onClick={shareAnalysis}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </GlowButton>

          <GlowButton variant="secondary" size="sm" onClick={exportAnalysis}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </GlowButton>

        </div>

      </motion.div>


      {/* Score */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card flex flex-col items-center rounded-2xl p-8 text-center"
      >

        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Validation Score
        </h2>

        <ScoreMeter score={analysis.validationScore} />

        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          Based on AI market analysis and startup viability evaluation.
        </p>

      </motion.div>


      {/* Strengths + Weaknesses */}

      <div className="grid gap-6 lg:grid-cols-2">

        <StrengthsSection
          items={analysis.strengths}
          delay={0.2}
        />

        <WeaknessesSection
          items={analysis.weaknesses}
          delay={0.3}
        />

      </div>


      {/* Market Potential */}

      <MarketPotentialSection
        content={analysis.marketPotential}
        delay={0.4}
      />


      {/* Suggestions */}

      <SuggestionsSection
        items={analysis.suggestions}
        delay={0.5}
      />


      {/* Bottom Buttons */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-4 sm:flex-row sm:justify-center"
      >

        <Link href="/dashboard">
          <GlowButton size="lg">
            Analyze Another Idea
          </GlowButton>
        </Link>

        <Link href="/dashboard/history">
          <GlowButton variant="secondary" size="lg">
            View History
          </GlowButton>
        </Link>

      </motion.div>

    </div>

  )

}