import type { BedroomCount, ValuationInput } from "./types.d.ts"
import get_location_value from "./methods/location.ts"
import get_building_value from "./methods/building.ts"
import get_inmutable_value from "./methods/inmutable.ts"
import get_condition_value from "./methods/condition.ts"
import data from "./data.json" with { type: "json" }
import get_factors_impact from "./utils/get_factors_impact.ts"
import { save_estimate } from "./utils/save_estimate.ts"

export default async function calculate_valuation(body: ValuationInput) {
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

	const precio_m2_base = get_average_value(body.bedrooms)

	const tasacion = final_factor * precio_m2_base * body.inmutable.covered_surface

	const factors = { location, building, inmutable, condition }
	const explanations = get_factors_impact(factors)
	const unique_adress = `${body.address.street} ${body.address.number || 'S/N'}${body.address.apartment ? ` ${body.address.apartment}` : ''}`
	const tasacion_rounded = Math.round(tasacion)

	await save_estimate({
		id: unique_adress,
		listed_value: body.listed_value,
		location_factor: location,
		building_factor: building,
		inmutable_factor: inmutable,
		condition_factor: condition,
		factor_final: final_factor,
		tasacion_usd: tasacion_rounded
	})

	return {
		id: unique_adress,
		listed_value: body.listed_value,
		factor_final: final_factor,
		tasacion_usd: tasacion_rounded,
		explanation: explanations
	}
}

function get_average_value(bedrooms: BedroomCount) {
	return data.average_value_per_bedroom[bedrooms]?.closing_price_USD_m2 || 0
}