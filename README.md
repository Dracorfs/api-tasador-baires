Para correr la API en local:
deno run --allow-net api.ts

Para correr los tests:
deno test

Ejemplo de request:
POST
https://api-tasador-baires.deno.dev/tasacion
{
    "listed_value": 100000,
    "neighbours": [
        "parks"
    ],
    "lighting": "good",
    "greenery": "good",
    "age": 15,
    "quality": "medium",
    "common_space": "good",
    "central_services": "medium",
    "exterior": "good",
    "prestige": "high",
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
        "layout": "front_facing",
        "type": "duplex",
        "views": "remarkable"
    },
    "condition": {
        "kitchen": "good",
        "bathrooms": "medium",
        "walls": "good",
        "floors": "good",
        "closets": "medium",
        "water": "good",
        "gas": "good",
        "electricity": "medium",
        "drainage": "good",
        "heating": "medium",
        "cooling": "good",
        "ventilation": "good"
    }
}