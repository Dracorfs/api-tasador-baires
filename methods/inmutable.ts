import type { InmutableData, CoveredSurfaceRanges } from "../types.d.ts"
import weights from "../weights.json" with { type: "json" }

/**
 * Calculates a factor based on immutable characteristics of the property,
 * such as surface area, floor level, orientation, and layout.
 *
 * These values are considered fixed and significantly affect valuation.
 *
 * @param listed_value - The published value of the property in USD.
 * @param input - An object with details: covered_surface, semi_covered_surface, uncovered_surface_balcony, uncovered_surface_backyard, maintenance_fees, fixed_costs_and_taxes, floor, building_highest_floor, orientation, layout, type, views.
 * @returns A factor between ~0.8 and ~1.2 representing the immutable impact on valuation.
 */
export default function get_inmutable_value(listed_value: number, input: InmutableData): number {
	let total = 1.0
	const weight = weights.inmutable

	const { covered_surface, maintenance_fees, fixed_costs_and_taxes, floor, orientation, layout, type, building_highest_floor, views } = input
	
	// 1. Covered surface area
	total *= get_covered_surface_factor(covered_surface, weight.covered_surface)

	// 2. Semi-covered and uncovered surface area
	total += get_semicovered_surface_factor(input)

	// 3. Value of monthly maintenance fees.
	const monthly_cost_factor = weight.monthly_cost_factor
	const affordability_fees = evaluate_affordability(listed_value, maintenance_fees, monthly_cost_factor)
	total *= affordability_fees
	//4. Value of fixed costs (AySA, ABL, and other taxes)
	const affordability_costs = evaluate_affordability(listed_value, fixed_costs_and_taxes, monthly_cost_factor)
	total *= affordability_costs
	
	// 5. Building floor
	total *= get_floor_factor(floor, building_highest_floor)

	// 6. Orientation
	total *= weight.orientation[orientation]

	// 7. Layout
	total *= weight.layout[layout]

	// 8. Views (subjective/relative)
	total *= weight.views[views]

	// 9. Type
	if (type === 'duplex') {
		if (covered_surface > 100) total *= 0.95
		else total *= 1.05
	}

	return parseFloat(total.toFixed(3))
}

function evaluate_affordability(listed_value: number, monthly_cost: number, factor: number): number {
	const weight = weights.inmutable.affordability_thresholds
	const ratio = listed_value / factor
	if (monthly_cost <= ratio * 0.75) return weight.good
	if (monthly_cost <= ratio * 1.25) return weight.acceptable
	return weight.bad
}

function get_covered_surface_factor(m2:number, weight:Record<CoveredSurfaceRanges, number>) {
	let factor:number
	if (m2 <= 30) factor = weight["<30m2"]
	else if (m2 <= 50) factor = weight["<50m2"]
	else if (m2 <= 100) factor = weight["<100m2"]
	else if (m2 <= 150) factor = weight["<150m2"]
	else if (m2 <= 250) factor = weight["<250m2"]
	else factor = weight[">250m2"]
	return factor
}

function get_semicovered_surface_factor(input: InmutableData) {
	const weight = weights.inmutable.uncovered_surface
	const { covered_surface, semi_covered_surface, uncovered_surface_balcony, uncovered_surface_backyard } = input
	const semi_covered_value = semi_covered_surface * weight.semi_covered
	const balcony_value = uncovered_surface_balcony * weight.balcony
	const backyard_value = uncovered_surface_backyard * weight.backyard
	const m2_extra = semi_covered_value + balcony_value + backyard_value
	return m2_extra / covered_surface // proportional
}

function get_floor_factor(floor: number, building_highest_floor: number) {
	const weight = weights.inmutable.floor
	let floor_factor:number
	if (floor <= 1) floor_factor = weight["<1"]
	else if (floor <= 3) floor_factor = weight["<3"]
	else if (floor <= 5) floor_factor = weight["<5"]
	else if (floor <= 7) floor_factor = weight["<7"]
	else if (floor <= 9) floor_factor = weight["<9"]
	else if (floor < building_highest_floor - 1) floor_factor = weight[">9"]
	else floor_factor = weight["highest"]
	return floor_factor
}