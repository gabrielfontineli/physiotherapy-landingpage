import { NextResponse } from "next/server"

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url?: string
}

// Fallback reviews used when API is not configured
const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    author_name: "Maria Fernanda",
    rating: 5,
    text: "Depois de anos sofrendo com dor nas costas e já ter passado por vários profissionais, finalmente encontrei alguém que entendeu meu problema. Em poucas sessões já senti uma melhora significativa. O Dr. Guilherme explica tudo com calma e paciência.",
    relative_time_description: "há 2 semanas",
  },
  {
    author_name: "Carlos Eduardo",
    rating: 5,
    text: "O Dr. Guilherme explicou tudo de forma clara e me deu autonomia para cuidar da minha coluna em casa. Hoje consigo trabalhar sem dor e voltei a fazer exercícios. Profissional excelente!",
    relative_time_description: "há 1 mês",
  },
  {
    author_name: "Ana Paula",
    rating: 5,
    text: "A dor que descia para minha perna me impedia de dormir. Com o tratamento do Dr. Guilherme, em 3 semanas já estava 90% melhor. Recomendo demais! Muito atencioso e competente.",
    relative_time_description: "há 3 semanas",
  },
  {
    author_name: "Roberto Silva",
    rating: 5,
    text: "Moro no interior e fiz o teleatendimento. Achei que não funcionaria, mas os exercícios que ele passou foram certeiros. Melhorei muito sem sair de casa. Super recomendo!",
    relative_time_description: "há 2 meses",
  },
  {
    author_name: "Luciana Costa",
    rating: 5,
    text: "Sofro com escoliose desde jovem e nunca encontrei um profissional tão dedicado. O Dr. Guilherme criou um plano específico para mim e finalmente estou conseguindo melhorar minha postura.",
    relative_time_description: "há 1 mês",
  },
  {
    author_name: "Pedro Henrique",
    rating: 5,
    text: "Trabalho o dia todo no computador e estava com dores terríveis no pescoço. As sessões com o Dr. Guilherme e os exercícios que ele passou fizeram toda diferença. Muito obrigado!",
    relative_time_description: "há 2 semanas",
  },
]

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  // Return fallback if env vars not configured
  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, source: "fallback" })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=pt-BR&key=${apiKey}`
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache 1h in production
      cache: process.env.NODE_ENV === "development" ? "no-store" : "default",
    })

    if (!res.ok) throw new Error(`Places API error: ${res.status}`)

    const data = await res.json()

    if (data.status !== "OK") {
      throw new Error(`Places API status: ${data.status}`)
    }

    const reviews: GoogleReview[] = (data.result.reviews ?? [])
      .filter((r: GoogleReview) => r.rating >= 4)
      .slice(0, 6)

    return NextResponse.json({
      reviews: reviews.length > 0 ? reviews : FALLBACK_REVIEWS,
      rating: data.result.rating,
      total: data.result.user_ratings_total,
      source: "google",
    })
  } catch (err) {
    console.error("[reviews] Google Places API failed:", err)
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, source: "fallback" })
  }
}
