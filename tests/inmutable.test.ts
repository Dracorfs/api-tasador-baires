import { assertAlmostEquals } from "./test_helpers.ts"
import get_inmutable_value from "../methods/inmutable.ts"
import type { InmutableData } from "../types.d.ts"

Deno.test("Inmutable: typical balanced case.", () => {
	const listed_value = 100000
	const input: InmutableData = {
		covered_surface: 70,               // 1.0
		semi_covered_surface: 5,           // 5 * 0.5 = 2.5 m2
		uncovered_surface_balcony: 5,      // 5 * 0.33 = 1.65 m2
		uncovered_surface_backyard: 0,     // 0
		maintenance_fees: 20000,           // affordable (listed_value / 1000 = 100)
		fixed_costs_and_taxes: 5000,       // affordable
		floor: 4,
		building_highest_floor: 10,
		orientation: "NE",                 // 1.05
		layout: "front_facing",            // 1.05
		type: "duplex",                    // no penalty unless too big
		views: "common"
	}

	const result = get_inmutable_value(listed_value, input)

	// Total should be around 1.05–1.15 based on these values
	assertAlmostEquals(result, 1.0, 0.1) // Acepta valores entre 0.9 y 1.1
})
