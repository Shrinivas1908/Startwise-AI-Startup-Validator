import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Gradient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      </div>
      
      <DashboardSidebar />
      
      <main className="relative min-h-screen lg:pl-64">
        <div className="mx-auto max-w-5xl px-6 py-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
