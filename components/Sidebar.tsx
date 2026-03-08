"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, TrendingUp, Settings, LogOut } from "lucide-react"
import { Logo } from "@/components/Logo"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-700">
      <div className="p-6">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-800 text-primary-400 border-l-2 border-primary-500"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <Separator className="mb-4 bg-slate-700" />
        <div className="flex items-center gap-3 px-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary-500 text-white text-xs">
              U
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-slate-300">Usuário</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-colors w-full"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </div>
  )
}
