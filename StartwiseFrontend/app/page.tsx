"use client"

import { motion } from "framer-motion"
import { BarChart3, Brain, Target, ShieldAlert, ArrowRight, Sparkles, Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { ParticlesBackground } from "@/components/particles-background"
import { GlowButton } from "@/components/glow-button"
import { FeatureCard } from "@/components/feature-card"

const features = [
  {
    icon: Brain,
    title: "AI Market Analysis",
    description: "Deep learning algorithms analyze market trends and identify opportunities for your startup idea.",
  },
  {
    icon: BarChart3,
    title: "Startup Viability Score",
    description: "Get a comprehensive score based on multiple factors including market size, competition, and timing.",
  },
  {
    icon: Target,
    title: "Competitor Insights",
    description: "Understand your competitive landscape with AI-powered competitor analysis and positioning strategies.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Prediction",
    description: "Identify potential risks and challenges before they become problems with predictive analytics.",
  },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticlesBackground />
      
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 border-b border-border/50 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Startwise AI</span>
          </Link>
          
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How it Works
            </Link>
            <Link href="/dashboard">
              <GlowButton size="sm">Get Started</GlowButton>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Startup Validation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Validate Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Startup Ideas
              </span>{" "}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl"
            >
              Instantly analyze your startup concept using AI-powered market intelligence. 
              Get validation scores, strengths, weaknesses, and actionable insights in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/dashboard">
                <GlowButton size="lg" className="w-full sm:w-auto">
                  Start Validating
                  <ArrowRight className="ml-2 inline-block h-5 w-5" />
                </GlowButton>
              </Link>
              <Link href="/dashboard?demo=true">
                <GlowButton variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Demo
                </GlowButton>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { value: "10K+", label: "Ideas Analyzed" },
              { value: "95%", label: "Accuracy Rate" },
              { value: "30s", label: "Avg Analysis Time" },
              { value: "4.9", label: "User Rating" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="mb-2 text-3xl font-bold text-primary md:text-4xl"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Powerful AI Features
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our advanced AI analyzes your startup idea from multiple angles to give you 
              comprehensive insights and actionable recommendations.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Get your startup idea validated in three simple steps.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit Your Idea",
                description: "Enter your startup title, description, and target market.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI analyzes your idea against market data and trends.",
              },
              {
                step: "03",
                title: "Get Insights",
                description: "Receive a detailed report with scores and recommendations.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                
                {index < 2 && (
                  <div className="absolute left-full top-8 hidden w-full -translate-x-1/2 md:block">
                    <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-12 text-center md:p-16">
            {/* Glow effects */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/30 blur-[60px]" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/30 blur-[60px]" />
            
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Ready to Validate Your Startup?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of entrepreneurs who have validated their ideas with Startwise AI.
              </p>
              <Link href="/dashboard">
                <GlowButton size="lg">
                  Start Analyzing Your Idea
                  <ArrowRight className="ml-2 inline-block h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Startwise AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered startup validation platform helping entrepreneurs make data-driven decisions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground transition-colors hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground transition-colors hover:text-primary">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Creator Info */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Created By</h4>
              <p className="mb-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Shrinivas Dhirbassi</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:shrinivasdhirbassi37@gmail.com"
                  className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
                <a
                  href="https://github.com/Shrinivas1908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shrinivas-dhirbassi-5b8417203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Startwise AI. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with passion by <span className="font-medium text-primary">Shrinivas Dhirbassi</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
