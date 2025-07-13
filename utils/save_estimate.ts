import pool from "./db.ts" // el cliente de Neon (usando postgres)

export async function save_estimate(data: {
id: string
listed_value: number
location_factor: number
building_factor: number
inmutable_factor: number
condition_factor: number
factor_final: number
tasacion_usd: number
}) {
	const client = await pool.connect()
	try {
		await client.queryObject`
		INSERT INTO estimates (
		property_id, listed_value, location_factor, building_factor, inmutable_factor, condition_factor, final_factor, valuation_usd
		) VALUES (
		${data.id}, ${data.listed_value}, ${data.location_factor}, ${data.building_factor},
		${data.inmutable_factor}, ${data.condition_factor}, ${data.factor_final}, ${data.tasacion_usd}
		)
		ON CONFLICT (id) DO UPDATE
		SET
		listed_value = EXCLUDED.listed_value,
		location_factor = EXCLUDED.location_factor,
		building_factor = EXCLUDED.building_factor,
		inmutable_factor = EXCLUDED.inmutable_factor,
		condition_factor = EXCLUDED.condition_factor,
		final_factor = EXCLUDED.final_factor,
		valuation_usd = EXCLUDED.valuation_usd;
	`
	}
	finally {
		client.release()
	}
}