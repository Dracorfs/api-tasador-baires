import { assertAlmostEquals } from "./test_helpers.ts"
import get_building_value from "../methods/building.ts"

Deno.test("Building: new, good quality, high prestige.", () => {
	const result = get_building_value(
		5,              // age
		"good",         // quality
		"good",         // common_space
		"good",         // central_services
		"good",         // exterior
		"high",         // prestige
	)
	assertAlmostEquals(result, 1.1, 0.001)
})

Deno.test("Building: too old, low quality.", () => {
	const result = get_building_value(
		70,             // age
		"bad",          // quality
		"bad",          // common_space
		"bad",          // central_services
		"bad",          // exterior
		"low",          // prestige
	)
	assertAlmostEquals(result, 0.9, 0.001)
})

Deno.test("Building: average.", () => {
	const result = get_building_value(
		25,             // age
		"medium",       // quality
		"medium",       // common_space
		"medium",       // central_services
		"medium",       // exterior
		"medium",       // prestige
	)
	assertAlmostEquals(result, 1.0, 0.001)
})