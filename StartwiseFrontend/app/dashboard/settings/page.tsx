"use client"

import { motion } from "framer-motion"
import { Volume2, VolumeX, Bell, Moon, User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SettingRowProps {
  icon: React.ElementType
  title: string
  description: string
  enabled: boolean
  onToggle: () => void
}

function SettingRow({ icon: Icon, title, description, enabled, onToggle }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl p-4 transition-colors hover:bg-muted/30">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className={cn(
          "relative h-7 w-12 rounded-full transition-colors duration-200",
          enabled ? "bg-primary" : "bg-muted"
        )}
      >
        <motion.div
          animate={{ x: enabled ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    soundEffects: true,
    notifications: true,
    darkMode: true,
    analyticsSharing: false,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your preferences and account settings.
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="mb-6 text-lg font-semibold text-foreground">Profile</h2>
        
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
            U
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">User</p>
            <p className="text-sm text-muted-foreground">user@example.com</p>
            <p className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              Free Plan
            </p>
          </div>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="mb-6 text-lg font-semibold text-foreground">Preferences</h2>
        
        <div className="space-y-2">
          <SettingRow
            icon={settings.soundEffects ? Volume2 : VolumeX}
            title="Sound Effects"
            description="Play sounds for button clicks and notifications"
            enabled={settings.soundEffects}
            onToggle={() => toggleSetting("soundEffects")}
          />
          
          <SettingRow
            icon={Bell}
            title="Notifications"
            description="Receive email notifications for analysis results"
            enabled={settings.notifications}
            onToggle={() => toggleSetting("notifications")}
          />
          
          <SettingRow
            icon={Moon}
            title="Dark Mode"
            description="Use dark theme for the interface"
            enabled={settings.darkMode}
            onToggle={() => toggleSetting("darkMode")}
          />
        </div>
      </motion.div>

      {/* Privacy Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="mb-6 text-lg font-semibold text-foreground">Privacy</h2>
        
        <div className="space-y-2">
          <SettingRow
            icon={Shield}
            title="Analytics Sharing"
            description="Help improve our AI by sharing anonymized data"
            enabled={settings.analyticsSharing}
            onToggle={() => toggleSetting("analyticsSharing")}
          />
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="mb-6 text-lg font-semibold text-foreground">Account</h2>
        
        <div className="space-y-4">
          <button className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">Edit Profile</p>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </button>
          
          <button className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-destructive/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently remove your account and data</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Version Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        Startwise AI v1.0.0
      </motion.p>
    </div>
  )
}
