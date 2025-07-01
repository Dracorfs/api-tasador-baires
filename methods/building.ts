/*
Building:
    1. Age
    2. Constructive quality
    3. Common spaces
    4. Central services
    5. Exteriors (walls, doors, etc.)
    6. Prestige. If "high", then fixed +10% total.
Total: +-10%
*/
import type { Quality,Prestige } from "../types.d.ts"

export default function get_building_value(
	age: number,
	quality: Quality,
	common_space: Quality,
	central_services: Quality,
	exterior: Quality,
	prestige: Prestige
): number {
	let total = 1.0

	// 1. Age
	if (age > 50)
		total -= 0.015
	else if (age < 10)
		total += 0.015

	// 2. Constructive quality
	if (quality === 'good')
		total += 0.025
	else if (quality === 'bad')
		total -= 0.025

	// 3. Common spaces
	if (common_space === 'good')
		total += 0.01
	else if (common_space === 'bad')
		total -= 0.01

	// 4. Central services
	if (central_services === 'good')
		total += 0.01
	else if (central_services === 'bad')
		total -= 0.01

	// 5. Exteriors
	if (exterior === 'good')
		total += 0.015
	else if (exterior === 'bad')
		total -= 0.015

	// 6. Prestige
	if (prestige === 'high')
		total = 1.1
	else if (prestige === 'low')
		total -= 0.025

	// Clamp to range [0.9, 1.1]
	return Math.max(0.9, Math.min(1.1, parseFloat(total.toFixed(3))))
}