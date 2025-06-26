import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import get_location_value from "./methods/location.ts"
import get_building_value from "./methods/building.ts"
import get_inmutable_value from "./methods/inmutable.ts"
import data from "./data.json" with { type: "json" }

serve(async (req: Request) => {
	if (req.method === "POST" && new URL(req.url).pathname === "/tasacion") {
		const body = await req.json()

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

		const inmutable = get_inmutable_value(body.inmutable)
		const final_factor = parseFloat((location * building * inmutable).toFixed(3))
		const precio_m2_base = Object.values(data.precios_promedio_cierre).at(-1) || 1
		const tasacion = final_factor * precio_m2_base * body.inmutable.covered_surface

		return new Response(
			JSON.stringify({
				location,
				building,
				inmutable,
				factor_final: final_factor,
				tasacion_usd: Math.round(tasacion)
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 200
			}
		)
	}

	return new Response("Ruta no encontrada", { status: 404 })
})