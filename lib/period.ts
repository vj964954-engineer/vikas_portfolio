// Helpers that turn "Feb 2025 – Present" style strings from lib/data.ts into month numbers for the charts.
export const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

/** month index = year * 12 + month (0-11) */
export const monthIndex = (d: Date) => d.getFullYear() * 12 + d.getMonth()

/** "Feb 2025 – Present" → [startMonthIndex, endMonthIndex | null] (null = still going) */
export function parsePeriod(p: string): [number, number | null] {
  const parts = p.split(/[–-]/).map((s) => s.trim())
  const toIdx = (s: string) => {
    const [m, y] = s.toLowerCase().split(/\s+/)
    return parseInt(y, 10) * 12 + MONTHS.indexOf(m.slice(0, 3))
  }
  return [toIdx(parts[0]), /present/i.test(parts[1] ?? "") ? null : toIdx(parts[1] ?? parts[0])]
}

/** "Q1 '25" label for a month index */
export function quarterLabel(idx: number) {
  const y = Math.floor(idx / 12)
  return `Q${Math.floor((idx % 12) / 3) + 1} '${String(y).slice(2)}`
}

/** One month index per quarter (the quarter's last month, clipped to `end`), from the quarter containing `start`. */
export function quarterEnds(start: number, end: number): number[] {
  const out: number[] = []
  for (let m = Math.floor(start / 3) * 3; m <= end; m += 3) out.push(Math.min(m + 2, end))
  return out
}
