import get_location_value from "./method/location.ts"
import get_building_value from "./method/building.ts"
import get_url from "./get_url.ts"
import data from "./data.json" with { type: "json" }
//Precio de cierre m2 de CABA (en USD ajustado por inflacion EEUU comienzo 2025)
//recurso: usinflationcalculator.com/inflation/calculator-cumulative/

const today = new Date()
let precio_promedio_cierre = data.precios_promedio_cierre[today.getFullYear()]
console.log(`Precio promedio de cierre: ${precio_promedio_cierre} ${data.unidad}.`)

// Metodo 3 6 9 12
let value = precio_promedio_cierre

// 3 location variables:
const location_value = get_location_value(['parques'], 'mediana', 'bueno')
value = precio_promedio_cierre * location_value
console.log(`Valor considerando la locacion (Indice=${location_value}): ${value} ${data.unidad}.`)

// 6 building variables:
const building_value = get_building_value(60, 'medium', 'bad', 'good', 'good')
value = value * building_value
console.log(`Valor considerando el edificio (Indice=${building_value}): ${value} ${data.unidad}.`)

// URL
const precio_base = 20000
const precio_techo = 200000
//console.log(get_url(precio_base, precio_techo))