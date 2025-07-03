import type { Quality,Prestige } from "../types.d.ts"

/**
 * Calculates the value factor based on the building's characteristics. Total: +-10%
 *
 * @param age - The age of the building in years.
 * @param quality - The constructive quality (good, medium, bad).
 * @param common_space - Quality of the shared/common spaces.
 * @param central_services - Quality of the central services.
 * @param exterior - Quality of the exterior (walls, doors, etc.).
 * @param prestige - The social prestige level of the building. If "high", then fixed +10% total.
 * @returns A factor between 0.9 and 1.1 representing the building value.
 *
 * @example
 * ```ts
 * const value = get_building_value(10, 'good', 'high', 'medium', 'good', 'good');
 * console.log(value); // e.g. 1.08
 * ```
 */
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