/*
Immutable Characteristics of the Apartment:
1. Covered surface area (in square meters):
	a. 1.1 for apartments up to 30 m²
	b. 1.05 from 31 to 50 m²
	c. 1.0 from 51 to 100 m²
	d. 0.95 from 101 to 150 m²
	e. 0.9 from 151 to 250 m²
	f. 0.8 for more than 250 m²
2. Semi-covered and uncovered surface area (in m²):
	a. 0.5 per m² of galleries or semi-covered laundry areas
	b. 0.33 per m² of uncovered balconies
	c. 0.2 per m² of uncovered backyard (with exceptions)
3. Value of monthly maintenance fees
4. Value of fixed costs (AySA, ABL, and other taxes)
5. Floor level in the building:
	a. 0.9 for ground floor or 1st floor
	b. 0.95 for 2nd and 3rd floors
	c. 1.0 for 4th and 5th floors
	d. 1.05 for 6th and 7th floors
	e. 1.1 for 8th and 9th floors
	f. 1.15 for floors above the 9th but below the top floor
	g. 0.9 for the top floor
6. Orientation:
	a. North (N): 1.1
	b. East (E) and West (W): 1.0
	c. South (S): 0.9
	d. Northeast (NE) and Northwest (NW): 1.05
	e. Southeast (SE) and Southwest (SW): 0.95
7. Layout:
Except on noisy streets, units facing the front are worth 5% more than those facing the back.
	a. Front-facing: 1.05
	b. Rear-facing: 1.0
	c. Internal or lateral: 0.9
	d. Inverted floor plan (e.g., hallway/living room facing the back and bedroom facing the front): 0.9
8. Views (subjective/relative)
9. Type:
A 140 m² duplex is worth less than the same surface on a single floor.
A 2-room duplex (if ceiling height allows) can be worth more than a 2-room single-floor unit.
	a. Studio apartment
	b. Half-floor / Full-floor unit
	c. Duplex
*/
type Orientation = 'N' | 'E' | 'O' | 'S' | 'NE' | 'NO' | 'SE' | 'SO'
type Layout = 'front_facing' | 'rear_facing' | 'internal' | 'lateral' | 'inverted_floor_plan'
type ApartmentType = 'studio_apartment' | 'half_floor' | 'full_floor' | 'duplex'
type Views = 'remarkable' | 'good' | 'common' | 'bad'

type InmutableInput = {
	covered_surface: number
	semi_covered_surface: number
	uncovered_surface_balcony: number
	uncovered_surface_backyard: number
	maintenance_fees: number
	fixed_costs_and_taxes: number
	floor: number
	orientation: Orientation
	layout: Layout
	type: ApartmentType
	building_highest_floor: number,
	views: Views
}

export default function get_inmutable_value(listed_value: number, input: InmutableInput): number {
	let total = 1.0

	const { covered_surface, semi_covered_surface, uncovered_surface_balcony, uncovered_surface_backyard, maintenance_fees, fixed_costs_and_taxes, floor, orientation, layout, type, building_highest_floor, views } = input
	
	// 1. Covered surface area
	if (covered_surface <= 30) total *= 1.1
	else if (covered_surface <= 50) total *= 1.05
	else if (covered_surface <= 100) total *= 1.0
	else if (covered_surface <= 150) total *= 0.95
	else if (covered_surface <= 250) total *= 0.9
	else total *= 0.8

	// 2. Semi-covered and uncovered surface area
	const m2_extra = semi_covered_surface * 0.5 + uncovered_surface_balcony * 0.33 + uncovered_surface_backyard * 0.2
	total += m2_extra / covered_surface // proportional

	// 3. Value of monthly maintenance fees.
	const monthly_cost_factor = 1000
	const affordability_fees = evaluate_affordability(listed_value, maintenance_fees, monthly_cost_factor)
	total *= affordability_fees
	//4. Value of fixed costs (AySA, ABL, and other taxes)
	const affordability_costs = evaluate_affordability(listed_value, fixed_costs_and_taxes, monthly_cost_factor)
	total *= affordability_costs
	
	// 5. Building floor
	let highnes_factor = 1
	if (floor <= 1) highnes_factor = 0.9
	else if (floor <= 3) highnes_factor = 0.95
	else if (floor <= 5) highnes_factor = 1.0
	else if (floor <= 7) highnes_factor = 1.05
	else if (floor <= 9) highnes_factor = 1.1
	else if (floor < building_highest_floor - 1) highnes_factor = 1.15
	else highnes_factor = 0.9
	total *= highnes_factor

	// 6. Orientation
	const orientation_factor: Record<Orientation, number> = {
		N: 1.1,
		E: 1.0,
		O: 1.0,
		S: 0.9,
		NE: 1.05,
		NO: 1.05,
		SE: 0.95,
		SO: 0.95
	}
	total *= orientation_factor[orientation]

	// 7. Layout
	const layout_factor: Record<Layout, number> = {
		front_facing: 1.05,
		rear_facing: 1.0,
		internal: 0.9,
		lateral: 0.9,
		inverted_floor_plan: 0.9
	}
	total *= layout_factor[layout]

	// 8. Views (subjective/relative)
	const views_factor: Record<Views, number> = {
		remarkable: 1.1,
		good: 1.05,
		common: 1.0,
		bad: 0.9,
	}
	total *= views_factor[views]

	// 9. Type
	if (type === 'duplex') {
		if (covered_surface > 100) total *= 0.95
		else total *= 1.05
	}

	return parseFloat(total.toFixed(3))
}

function evaluate_affordability(listed_value: number, monthly_cost: number, factor: number): number {
	const ratio = listed_value / factor
	if (monthly_cost <= ratio * 0.75) return 1.1 //'good'
	if (monthly_cost <= ratio * 1.25) return 1 //'acceptable'
	return 0.9 //'bad'
}