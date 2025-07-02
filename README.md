# 🏢 Tasador Baires - API

Una API para estimar el valor de tasación de propiedades en la Ciudad Autónoma de Buenos Aires, utilizando múltiples factores como ubicación, estado del edificio, características inmutables y condición general.

---

## 🚀 Cómo ejecutar el proyecto
Asegurate de tener Deno instalado: https://deno.land/

### ▶️ Ejecutar la API en local

```bash
deno run --allow-net api.ts
```

### ✅ Ejecutar los tests
```bash
deno test
```
Incluye tests unitarios para cada módulo de cálculo.

## Ejemplos
### 📩 Ejemplo de Request
#### Método
```http
POST /tasacion
Content-Type: application/json
```
#### URL
```http
https://api-tasador-baires.deno.dev/tasacion
```
#### Body
```json
{
  "listed_value": 100000,
  "neighbours": ["parks"],
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
```
### 📤 Ejemplo de Response
```json
{
    "location": 1.2,
    "building": 1.1,
    "inmutable": 1.147,
    "condition": 1.2,
    "listed_value": 100000,
    "factor_final": 1.817,
    "tasacion_usd": 279818
}
```

## 📁 Estructura del proyecto
methods/: Módulos de cálculo individuales.
utils/: Utilidades generales (reportes, helpers, etc).
tests/: Tests unitarios para cada función.
data.json: Datos de referencia (valores históricos de m²).
api.ts: Entrada principal del servidor HTTP.
calculate.ts: Lógica central desacoplada de la API.
types.d.ts: Tipos globales.