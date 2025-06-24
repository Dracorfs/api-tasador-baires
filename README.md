deno run ./tasador.js

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
        "cubiertos": 70,
        "semiCubiertos": 5,
        "descubiertos_balcon": 5,
        "descubiertos_patio": 0,
        "expensas": 25000,
        "impuestos_fijos": 10000,
        "piso": 6,
        "altura_total_edificio": 10,
        "orientacion": "NE",
        "disposicion": "frente",
        "tipo": "duplex"
    }
}