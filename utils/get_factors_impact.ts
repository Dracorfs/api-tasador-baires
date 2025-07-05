export default function get_factors_impact(factors: Record<string, number>): string[] {
	const base = 1.0
	return Object.entries(factors)
		.map(([key, value]) => ({
			key,
			impact: Math.abs(value - base),
			direction: value > base ? "positive" : value < base ? "negative" : "neutral"
		}))
		.sort((a, b) => b.impact - a.impact)
		.map(f => `${f.key}: ${f.direction} (${f.impact.toFixed(3)})`)
}