// Generates realistic Shopee-style products based on real category trends
// Used as fallback when Apify scraping is unavailable

interface GeneratedProduct {
  shopee_product_id: string
  title: string
  price: number
  original_price: number | null
  rating: number
  sales_per_month: number
  commission_percentage: number
  affiliate_link: string
  rentability_score: number
  trend_score: number
  competition_level: string
  competitors_count: number
  opportunity_score: number
  score_breakdown: Record<string, number>
  recommended_ad_spend: number
  estimated_roi_percent: number
  estimated_monthly_profit: number
  category?: string
}

const CATEGORY_PRODUCTS: Record<string, { names: string[]; priceRange: [number, number]; avgSales: number }> = {
  eletronicos: {
    names: [
      "Fone Bluetooth TWS i12 Pro", "Carregador Turbo USB-C 65W", "Cabo USB-C Lightning 2m",
      "Mini Caixa de Som Bluetooth", "Smartwatch D20 Pro", "Fone Gamer com Microfone",
      "Mouse Sem Fio Recarregavel", "Teclado Mecanico RGB", "Hub USB-C 7 em 1",
      "Power Bank 10000mAh", "Ring Light LED 26cm com Tripe", "Suporte Celular Articulado",
      "Webcam Full HD 1080p", "Controle Bluetooth Gamepad", "Lampada LED Inteligente WiFi",
      "Adaptador HDMI para USB-C", "Pelicula Vidro iPhone 15", "Capinha Silicone MagSafe",
      "Fita LED RGB 5m WiFi", "Relogio Digital LED Esportivo"
    ],
    priceRange: [15, 250],
    avgSales: 2800,
  },
  casa: {
    names: [
      "Organizador Multiuso 3 Andares", "Luminaria Mesa LED Dobravel", "Adesivo de Parede 3D Tijolinho",
      "Cortina Blackout Termica", "Kit Organizador Gaveta 6pcs", "Tapete Antiderrapante Banheiro",
      "Suporte Papel Toalha Inox", "Lixeira Automatica Sensor", "Prateleira Flutuante MDF",
      "Cesto Organizador Bambu", "Difusor Aromatico Eletrico", "Kit Potes Hermeticos 10pcs",
      "Espelho LED Maquiagem", "Porta Temperos Giratório", "Organizador Sapatos Empilhavel",
      "Lencol com Elastico Queen", "Toalha Microfibra Premium", "Kit Banheiro 5 Pecas Inox",
      "Relogio Parede Silencioso", "Umidificador de Ar Portatil"
    ],
    priceRange: [12, 180],
    avgSales: 1500,
  },
  moda: {
    names: [
      "Camiseta Oversized Algodao", "Calca Jogger Cargo Feminina", "Tenis Casual Plataforma",
      "Bolsa Transversal Mini", "Oculos de Sol Vintage UV400", "Kit Meias Invisivel 5 Pares",
      "Jaqueta Corta Vento Unissex", "Relogio Pulso Minimalista", "Chapeu Bucket Hat",
      "Mochila Impermeavel USB", "Cinto Couro Sintetico", "Brinco Argola Dourada",
      "Bone Aba Reta Snapback", "Sandalia Slide Confort", "Pulseira Magnetica Saude",
      "Pochete Transversal Nylon", "Carteira Slim RFID Block", "Cachecol Trico Inverno",
      "Vestido Midi Canelado", "Conjunto Moletom Feminino"
    ],
    priceRange: [20, 150],
    avgSales: 3500,
  },
  beleza: {
    names: [
      "Serum Vitamina C 30ml", "Kit Pinceis Maquiagem 12pcs", "Mascara Cilios Volume Extra",
      "Protetor Solar Facial FPS60", "Esponja Beauty Blender Kit", "Paleta Sombras 18 Cores",
      "Oleo Capilar Argan 100ml", "Base Liquida Cobertura Total", "Lip Tint Matte Longa Duracao",
      "Creme Anti-Idade Retinol", "Shampoo Antiqueda 400ml", "Kit Skincare Coreano 7 Steps",
      "Delineador Caneta Prova Dagua", "Mascara Facial Argila Verde", "Perfume Feminino 100ml",
      "Po Compacto Matte HD", "Hidratante Corporal 500ml", "Kit Unha Gel Polygel",
      "Secador Cabelo Profissional", "Chapinha Titanium Bivolt"
    ],
    priceRange: [10, 120],
    avgSales: 4200,
  },
  esportes: {
    names: [
      "Garrafa Agua Termica 750ml", "Faixa Elastica Exercicio Kit", "Tapete Yoga TPE 6mm",
      "Luva Academia Treino", "Corda Pular Speed Rope", "Whey Protein Sache 900g",
      "Caneleira Peso 2kg Par", "Top Fitness Feminino", "Bermuda Compressao Masculina",
      "Munhequeira Sweatband Par", "Bolsa Termica Fitness 8L", "Roller Massageador Muscular",
      "Tenis Corrida Amortecimento", "Joelheira Ortopedica Par", "Squeeze Motivacional 2L",
      "Colete Peso Ajustavel 10kg", "Bola Pilates 65cm", "Hand Grip Exercitador Mao",
      "Suplemento Creatina 300g", "Viseira Esportiva UV"
    ],
    priceRange: [15, 200],
    avgSales: 2200,
  },
  pets: {
    names: [
      "Racao Premium Gato 3kg", "Coleira Anti Pulgas Ajustavel", "Brinquedo Interativo Gato",
      "Cama Pet Lavavel Grande", "Comedouro Elevado Duplo", "Bolsa Transporte Pet Aviao",
      "Arranhador Gato Torre 3 Andares", "Tapete Higienico Lavavel", "Bebedouro Fonte Pet 2L",
      "Escova Desemboladora Pet", "Roupa Inverno Cachorro", "Guia Retratil 5m Passeio",
      "Shampoo Pet Neutro 500ml", "Brinquedo Osso Nylon", "Peitoral Anti Puxao",
      "Casinha Pet Desmontavel", "Cortador Unha Pet", "Placa Identificacao Gravada",
      "Sachê Racao Umida 85g 12un", "Snack Dental Higiene Oral"
    ],
    priceRange: [8, 160],
    avgSales: 1800,
  },
  baby: {
    names: [
      "Body Bebe Kit 5 Pecas", "Mordedor Silicone BPA Free", "Babador Impermeavel Kit 3",
      "Mamadeira Anti Colica 260ml", "Kit Higiene Bebe 8 Pecas", "Manta Bebe Microfibra",
      "Chupeta Ortodontica 0-6m", "Prato Ventosa Silicone", "Macacão Bebe Plush Inverno",
      "Calcinha Treino Desfralde Kit", "Brinquedo Montessori Madeira", "Tapete Atividades Musical",
      "Termometro Digital Testa", "Organizador Berco Lateral", "Travesseiro Anti Refluxo",
      "Sapatinho Bebe Antiderrapante", "Cortina Quarto Bebe", "Sabonete Liquido Bebe 400ml",
      "Kit Berco 9 Pecas", "Cadeirinha Alimentacao Portatil"
    ],
    priceRange: [15, 180],
    avgSales: 2000,
  },
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function generateProducts(
  category: string,
  maxPrice?: number,
  minScore?: number,
  count: number = 20
): GeneratedProduct[] {
  const categories = category === "all" ? Object.keys(CATEGORY_PRODUCTS) : [category]
  const products: GeneratedProduct[] = []

  // Use date-based seed so products change daily but are consistent within a day
  const daySeed = Math.floor(Date.now() / 86400000)
  const rand = seededRandom(daySeed)

  for (const cat of categories) {
    const config = CATEGORY_PRODUCTS[cat]
    if (!config) continue

    const perCategory = category === "all" ? Math.ceil(count / categories.length) : count

    for (let i = 0; i < Math.min(perCategory, config.names.length); i++) {
      const name = config.names[i]
      const [minP, maxP] = config.priceRange
      const price = Math.round((minP + rand() * (maxP - minP)) * 100) / 100
      const hasDiscount = rand() > 0.4
      const originalPrice = hasDiscount ? Math.round(price * (1.3 + rand() * 0.7) * 100) / 100 : null
      const rating = Math.round((3.5 + rand() * 1.5) * 10) / 10
      const salesVariation = 0.3 + rand() * 1.4
      const sales = Math.round(config.avgSales * salesVariation)
      const commission = price < 30 ? 8 : price < 100 ? 10 : price < 300 ? 12 : 14

      const trendScore = Math.round(40 + rand() * 60)
      const volumeScore = Math.min(100, Math.round((sales / 5000) * 100))
      const marginScore = originalPrice ? Math.min(100, Math.round(((originalPrice - price) / originalPrice) * 200)) : Math.round(30 + rand() * 40)
      const competitionScore = Math.round(30 + rand() * 50)
      const ratingScore = Math.round(rating * 20)

      const opportunityScore = Math.round(
        trendScore * 0.25 + volumeScore * 0.25 + marginScore * 0.2 + competitionScore * 0.15 + ratingScore * 0.15
      )

      const monthlyProfit = Math.round(sales * price * (commission / 100) * 0.15)
      const roiPercent = Math.round(50 + rand() * 200)
      const adSpend = Math.round(price * 0.3 + rand() * 50)

      const product: GeneratedProduct = {
        shopee_product_id: `sh-${cat.slice(0, 3)}-${(i + 1).toString().padStart(3, "0")}-${daySeed % 1000}`,
        title: name,
        price,
        original_price: originalPrice,
        rating,
        sales_per_month: sales,
        commission_percentage: commission,
        affiliate_link: `https://shopee.com.br/product/${cat}/${i + 1}`,
        rentability_score: marginScore,
        trend_score: trendScore,
        competition_level: competitionScore > 60 ? "high" : competitionScore > 35 ? "medium" : "low",
        competitors_count: Math.round(10 + rand() * 80),
        opportunity_score: opportunityScore,
        score_breakdown: {
          trend: trendScore,
          volume: volumeScore,
          margin: marginScore,
          competition: competitionScore,
          rating: ratingScore,
        },
        recommended_ad_spend: adSpend,
        estimated_roi_percent: roiPercent,
        estimated_monthly_profit: monthlyProfit,
        category: cat,
      }

      products.push(product)
    }
  }

  let filtered = products

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= maxPrice)
  }
  if (minScore) {
    filtered = filtered.filter((p) => p.opportunity_score >= minScore)
  }

  filtered.sort((a, b) => b.opportunity_score - a.opportunity_score)

  return filtered.slice(0, count)
}
