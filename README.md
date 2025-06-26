Para correr la API en local:
deno run --allow-net api.ts

Ejemplo de request:
POST
https://api-tasador-baires.deno.dev/tasacion
{
    "vecinos": [
        "parques"
    ],
    "iluminacion": "buena",
    "arbolado": "bueno",
    "edad": 15,
    "calidad": "medium",
    "espacios_comunes": "good",
    "servicios_centrales": "medium",
    "exteriores": "good",
    "inmutable": {
        "covered_surface": 70,
        "semi_covered_surface": 5,
        "uncovered_surface_balcony": 5,
        "uncovered_surface_backyard": 0,
        "maintenance_fees": 25000,
        "fixed_costs_and_taxes": 10000,
        "floor": 6,
        "building_highest_floor": 10,
        "orientation": "NE",
        "layout": "frente",
        "type": "duplex"
    }
}