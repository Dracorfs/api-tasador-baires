import calculate_valuation from "./calculate.ts"

Deno.serve(async (req: Request) => {
	if (req.method === "POST" && new URL(req.url).pathname === "/tasacion") {
		const body = await req.json()
		const resultado = calculate_valuation(body)

		return new Response(JSON.stringify(resultado), {
			headers: { "Content-Type": "application/json" },
			status: 200
		})
	}

	return new Response("Ruta no encontrada", { status: 404 })
})