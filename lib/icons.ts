import { apps, caseStudies } from "@/lib/data"

// Play Store icon URLs end in a size suffix (=w240-h480-rw, =s256-rw ...). Normalise to a square 256px icon.
const sq = (u: string) => u.replace(/=[sw]\d+.*$/, "") + "=s256-rw"

async function one(url: string): Promise<[string, string] | null> {
  try {
    const opt = { next: { revalidate: 86400 }, signal: AbortSignal.timeout(6000), headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)", "Accept-Language": "en" } }
    const ios = url.match(/\/id(\d+)/)
    if (ios) {
      const j = await (await fetch(`https://itunes.apple.com/lookup?id=${ios[1]}&country=in`, opt)).json()
      const a = j.results?.[0]?.artworkUrl512 || j.results?.[0]?.artworkUrl100
      return a ? [url, a] : null
    }
    const pkg = url.match(/[?&]id=([\w.]+)/)
    if (pkg) {
      const html = await (await fetch(`https://play.google.com/store/apps/details?id=${pkg[1]}&hl=en&gl=IN`, opt)).text()
      const m = html.match(/<meta property="og:image" content="([^"]+)"/) || html.match(/itemprop="image" content="([^"]+)"/)
      return m ? [url, sq(m[1].replace(/&amp;/g, "&"))] : null
    }
  } catch {}
  return null
}

/** Runs on the server at build time (and re-checks daily). Maps each store URL to its live icon; missing ones fall back to lib/data.ts images. */
export async function getIcons(): Promise<Record<string, string>> {
  const urls = Array.from(new Set([...apps.map((a) => a.url), ...caseStudies.flatMap((c) => c.links.map((l) => l.href))]))
  const out = await Promise.all(urls.map(one))
  return Object.fromEntries(out.filter(Boolean) as [string, string][])
}
