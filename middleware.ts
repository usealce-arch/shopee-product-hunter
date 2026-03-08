import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

const publicRoutes = ["/", "/login", "/signup"]
const authApiRoutes = ["/api/auth/signup", "/api/auth/login", "/api/auth/logout"]
const alwaysPublicApi = ["/api/health", "/api/categories"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.includes(pathname) || authApiRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (alwaysPublicApi.some((r) => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  // Demo mode: if demo cookie is set, allow access
  const demoMode = request.cookies.get("demo_mode")?.value === "true"
  if (demoMode) {
    return NextResponse.next()
  }

  // Try Supabase auth if tokens look valid (JWT format)
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  const isRealToken = anonKey.startsWith("eyJ")

  if (!isRealToken) {
    // Supabase not configured — allow all access
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/analytics") || pathname.startsWith("/settings") || pathname.startsWith("/api/"))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 })
    }
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
