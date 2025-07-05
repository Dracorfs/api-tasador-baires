import type { Quality,Prestige } from "../types.d.ts"
import weights from "../weights.json" with { type: "json" }

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
		total += weights.building.age.old_penalty
	else if (age < 10)
		total += weights.building.age.new_bonus

	// 2. Constructive quality
	if (quality === 'good')
		total += weights.building.quality.good
	else if (quality === 'bad')
		total += weights.building.quality.bad

	// 3. Common spaces
	if (common_space === 'good')
		total += weights.building.common_space.good
	else if (common_space === 'bad')
		total += weights.building.common_space.bad

	// 4. Central services
	if (central_services === 'good')
		total += weights.building.central_services.good
	else if (central_services === 'bad')
		total += weights.building.central_services.bad

	// 5. Exteriors
	if (exterior === 'good')
		total += weights.building.exterior.good
	else if (exterior === 'bad')
		total += weights.building.exterior.bad

	// 6. Prestige
	if (prestige === 'high')
		total = weights.building.prestige.high
	else if (prestige === 'low')
		total += weights.building.prestige.low

	// Clamp to range [0.9, 1.1]
	return Math.max(0.9, Math.min(1.1, parseFloat(total.toFixed(3))))
}