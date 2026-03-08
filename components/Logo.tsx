"use client"

import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const sizes = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-xl" },
  lg: { icon: 36, text: "text-2xl" },
}

export function Logo({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const s = sizes[size]

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <ShoppingBag size={s.icon} className="text-primary-500" />
      <span className={cn("font-bold text-white", s.text)}>
        Shopee <span className="text-primary-500">Hunter</span>
      </span>
    </Link>
  )
}
