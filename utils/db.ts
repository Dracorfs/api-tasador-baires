import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts"
import "https://deno.land/std@0.224.0/dotenv/load.ts"

const pool = new Pool({
	hostname: Deno.env.get("PG_HOST"),
	port: Number(Deno.env.get("PG_PORT")),
	user: Deno.env.get("PG_USER"),
	password: Deno.env.get("PG_PASSWORD"),
	database: Deno.env.get("PG_DATABASE")
}, 3, true) // 3 simultanous connections

export default pool