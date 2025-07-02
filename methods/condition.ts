/*
Condition-related variables (can be improved)
(Overall weight: ±20%. So if fully renovated: +50%)
    Kitchen
    Bathrooms
    Walls
    Floors
    Closets
Installations:
    Water supply
    Gas system
    Electrical system
    Drainage functionality
Systems:
    Heating
    Cooling / Air conditioning
    Ventilation
*/
import type { ConditionData } from "../types.d.ts"

export default function get_condition_value(condition: ConditionData): number {
	let total = 1.0

	// Config weight by groups
	const weight = {
		ambient: 0.1,        // kitchen, bathrooms, etc.
		installations: 0.1,  // water, gas, etc.
		systems: 0.1        // heating, etc.
	}
	// Maximum = 1 + 0.1 + 0.1 + 0.1 = 1.3 → clamped a 1.2
	// Minimum = 0.9 * 0.9 * 0.9 = 0.729 → clamped a 0.8

	// Groups
	const ambient = ['kitchen', 'bathrooms', 'walls', 'floors', 'closets']
	const installations = ['water', 'gas', 'electricity', 'drainage']
	const systems = ['heating', 'cooling', 'ventilation']

	// Evaluator
	function group_score(keys: string[], w: number) {
		let score = 0
		for (const key of keys) {
			const value = condition[key as keyof ConditionData]
			if (value === 'good') score += 1
			else if (value === 'medium') score += 0.5
			// bad → 0
		}
		const ratio = score / keys.length // 0 a 1
		return 1 + (w * 2 * (ratio - 0.5)) // lineal between -w y +w
	}

	const factor_ambient = group_score(ambient, weight.ambient)
	const factor_installations = group_score(installations, weight.installations)
	const factor_systems = group_score(systems, weight.systems)

	total *= factor_ambient * factor_installations * factor_systems

	// Clamp to range [0.8, 1.2]
	return Math.max(0.8, Math.min(1.2, parseFloat(total.toFixed(3))))
}