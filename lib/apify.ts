const APIFY_API_KEY = process.env.APIFY_API_KEY || ""
const APIFY_BASE_URL = "https://api.apify.com/v2"

// Actor ID do Shopee Scraper — trocar quando alugar um actor
const SHOPEE_ACTOR_ID = "best_scraper~shopee-scraper"

export interface ApifyRunResult {
  runId: string
  datasetId: string
  status: string
}

export interface ShopeeRawProduct {
  name: string
  price: number
  original_price?: number
  rating?: number
  sold?: number | string
  image?: string
  link?: string
  shop_name?: string
  shop_rating?: number
  item_id?: string | number
  shop_id?: string | number
  discount?: string
  location?: string
}

export async function initializeScraping(
  keyword: string,
  maxItems: number = 20
): Promise<ApifyRunResult> {
  if (!APIFY_API_KEY) {
    throw new Error("APIFY_API_KEY not configured")
  }

  const res = await fetch(
    `${APIFY_BASE_URL}/acts/${SHOPEE_ACTOR_ID}/runs?waitForFinish=0`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${APIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: "BR",
        keyword,
        maxItems,
      }),
    }
  )

  const json = await res.json()

  if (json.error) {
    throw new Error(json.error.message || "Apify error")
  }

  const data = json.data
  return {
    runId: data.id,
    datasetId: data.defaultDatasetId,
    status: data.status,
  }
}

export async function checkScrapingStatus(
  runId: string
): Promise<{ status: string; finished: boolean }> {
  const res = await fetch(`${APIFY_BASE_URL}/actor-runs/${runId}`, {
    headers: { Authorization: `Bearer ${APIFY_API_KEY}` },
  })

  const data = (await res.json()).data
  const finished = ["SUCCEEDED", "FAILED", "TIMED-OUT", "ABORTED"].includes(
    data.status
  )

  return { status: data.status, finished }
}

export async function getScrapingResults(
  datasetId: string
): Promise<ShopeeRawProduct[]> {
  const res = await fetch(
    `${APIFY_BASE_URL}/datasets/${datasetId}/items?limit=50`,
    {
      headers: { Authorization: `Bearer ${APIFY_API_KEY}` },
    }
  )

  const items = await res.json()

  if (!Array.isArray(items)) return []

  // Filter out error items
  return items.filter(
    (item: Record<string, unknown>) => !item["#error"]
  ) as ShopeeRawProduct[]
}

export function normalizeProducts(raw: ShopeeRawProduct[]) {
  return raw
    .filter((p) => p.name && p.price > 0)
    .map((p) => {
      const soldNum = parseSold(p.sold)
      const commission = estimateCommission(p.price)
      const monthlyProfit = soldNum * p.price * (commission / 100)

      return {
        shopee_product_id: String(p.item_id || `gen-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        title: p.name.slice(0, 200),
        price: p.price,
        original_price: p.original_price || null,
        rating: p.rating || null,
        sales_per_month: soldNum,
        commission_percentage: commission,
        affiliate_link: p.link || "",
        opportunity_score: 0, // calculated later by Gemini
        estimated_roi_percent: 0,
        estimated_monthly_profit: monthlyProfit,
        competition_level: "medium" as const,
        competitors_count: null,
        last_scraped_at: new Date().toISOString(),
      }
    })
}

function parseSold(sold: unknown): number {
  if (typeof sold === "number") return sold
  if (typeof sold !== "string") return 0

  const cleaned = sold
    .toLowerCase()
    .replace(/[^\d,km.]/g, "")
    .replace(",", ".")

  if (cleaned.includes("k")) {
    return Math.round(parseFloat(cleaned.replace("k", "")) * 1000)
  }
  if (cleaned.includes("m")) {
    return Math.round(parseFloat(cleaned.replace("m", "")) * 1000000)
  }

  return parseInt(cleaned) || 0
}

function estimateCommission(price: number): number {
  if (price < 30) return 8
  if (price < 100) return 10
  if (price < 300) return 12
  return 14
}
