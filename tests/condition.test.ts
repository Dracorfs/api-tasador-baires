import { assertAlmostEquals } from "./test_helpers.ts"
import get_condition_value from "../methods/condition.ts"

Deno.test("Condition: all medium.", () => {
	const result = get_condition_value({
		kitchen: "medium",
		bathrooms: "medium",
		walls: "medium",
		floors: "medium",
		closets: "medium",
		water: "medium",
		gas: "medium",
		electricity: "medium",
		drainage: "medium",
		heating: "medium",
		cooling: "medium",
		ventilation: "medium"
	})
	assertAlmostEquals(result, 1.0, 0.001)
})

Deno.test("Condition: perfect.", () => {
	const result = get_condition_value({
		kitchen: "good",
		bathrooms: "good",
		walls: "good",
		floors: "good",
		closets: "good",
		water: "good",
		gas: "good",
		electricity: "good",
		drainage: "good",
		heating: "good",
		cooling: "good",
		ventilation: "good"
	})
	assertAlmostEquals(result, 1.2, 0.001)
})

Deno.test("Condition: worst.", () => {
	const result = get_condition_value({
		kitchen: "bad",
		bathrooms: "bad",
		walls: "bad",
		floors: "bad",
		closets: "bad",
		water: "bad",
		gas: "bad",
		electricity: "bad",
		drainage: "bad",
		heating: "bad",
		cooling: "bad",
		ventilation: "bad"
	})
	assertAlmostEquals(result, 0.8, 0.001)
})