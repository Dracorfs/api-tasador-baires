import type { ValuationInput } from "./types.d.ts"
import get_location_value from "./methods/location.ts"
import get_building_value from "./methods/building.ts"
import get_inmutable_value from "./methods/inmutable.ts"
import get_condition_value from "./methods/condition.ts"
import data from "./data.json" with { type: "json" }

export default function calculate_valuation(body: ValuationInput) {
	const location = get_location_value(
		body.neighbours,
		body.lighting,
		body.greenery
	)

	const building = get_building_value(
		body.age,
		body.quality,
		body.common_space,
		body.central_services,
		body.exterior,
		body.prestige
	)

	const inmutable = get_inmutable_value(body.listed_value, body.inmutable)

	const condition = get_condition_value(body.condition)

	const subtotal_factor = location * building * inmutable * condition
	const final_factor = parseFloat(subtotal_factor.toFixed(3))

	const precio_m2_base = Object.values(data.precios_promedio_cierre).at(-1) || 1

	const tasacion = final_factor * precio_m2_base * body.inmutable.covered_surface

	return {
		location,
		building,
		inmutable,
		condition,
		listed_value: body.listed_value,
		factor_final: final_factor,
		tasacion_usd: Math.round(tasacion)
	}
}