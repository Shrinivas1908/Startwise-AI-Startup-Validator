"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Brain, Loader2, Sparkles } from "lucide-react"
import { GlowButton } from "./glow-button"
import { cn } from "@/lib/utils"

interface IdeaFormData {
  title: string
  description: string
  market: string
}

export function IdeaForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    description: "",
    market: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {

    const response = await fetch("http://localhost:5000/api/ideas/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    console.log("API RESULT:", result)

    sessionStorage.setItem("currentIdea", JSON.stringify(formData))

    // ✅ store only the analysis
    sessionStorage.setItem("analysisResult", JSON.stringify(result.data))

    router.push("/dashboard/result")

  } catch (error) {

    console.error(error)

  } finally {

    setIsLoading(false)

  }
}

  const inputClasses = cn(
    "w-full rounded-xl border border-border bg-input px-4 py-3",
    "text-foreground placeholder:text-muted-foreground",
    "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
    "transition-all duration-200"
  )

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Brain className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Analyze Your Idea
          </h2>

          <p className="text-sm text-muted-foreground">
            Fill in the details below to get AI-powered insights
          </p>
        </div>
      </div>


      {/* Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Startup Title
        </label>

        <input
          id="title"
          type="text"
          required
          placeholder="e.g., AI-Powered Recipe Generator"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className={inputClasses}
        />
      </div>


      {/* Description */}
      <div className="space-y-2">

        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </label>

        <textarea
          id="description"
          required
          rows={4}
          placeholder="Describe your startup idea..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={cn(inputClasses, "resize-none")}
        />

      </div>


      {/* Market */}
      <div className="space-y-2">

        <label htmlFor="market" className="text-sm font-medium text-foreground">
          Target Market
        </label>

        <input
          id="market"
          type="text"
          required
          placeholder="e.g., Students, professionals"
          value={formData.market}
          onChange={(e) =>
            setFormData({ ...formData, market: e.target.value })
          }
          className={inputClasses}
        />

      </div>


      {/* Button */}
      <div className="flex justify-center pt-2">

        <GlowButton
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center"
        >

          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze Idea
            </>
          )}

        </GlowButton>

      </div>


      {/* Tips */}
      <div className="rounded-xl border border-border/50 bg-muted/30 p-4">

        <p className="text-xs font-medium text-muted-foreground mb-2">
          Tips for better analysis:
        </p>

        <ul className="space-y-1 text-xs text-muted-foreground">

          <li>• Be specific about your unique value proposition</li>
          <li>• Include the problem you're solving</li>
          <li>• Mention existing competition</li>

        </ul>

      </div>

    </motion.form>
  )
}