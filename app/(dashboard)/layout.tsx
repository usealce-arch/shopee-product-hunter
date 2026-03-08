"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"
import { Logo } from "@/components/Logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="text-slate-400 hover:text-white p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px] bg-slate-900 border-slate-700">
            <Sidebar onNavigate={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>
        <Logo size="sm" />
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary-500 text-white text-xs">
            U
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-[240px] h-screen sticky top-0">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-w-0">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
