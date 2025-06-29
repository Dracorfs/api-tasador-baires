import { assertEquals } from "./test_helpers.ts"
import get_location_value from "../methods/location.ts"

Deno.test("Location with parks and good lighting.", () => {
	const result = get_location_value(["parks"], "good", "good")
	assertEquals(result, 1.2)
})

Deno.test("Location with fire-stations and bad lighting.", () => {
	const result = get_location_value(["fire-stations"], "bad", "bad")
	assertEquals(result, 0.8)
})