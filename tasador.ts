import get_location_value from "./methods/location.ts"
import get_building_value from "./methods/building.ts"
import get_inmutable_value from "./methods/inmutable.ts"
import get_url from "./get_url.ts"
import data from "./data.json" with { type: "json" }
//recurso: usinflationcalculator.com/inflation/calculator-cumulative/

const today = new Date()
let precio_promedio_cierre = data.precios_promedio_cierre[today.getFullYear()]

// Metodo 3 6 9 12
let ideal_average_value = precio_promedio_cierre

// 3 location variables:
const location_value = get_location_value(['parques'], 'mediana', 'bueno')
ideal_average_value *= location_value

// 6 building variables:
const building_value = get_building_value(60, 'medium', 'bad', 'good', 'good')
ideal_average_value *= building_value

// 9 inmutable variables:
const inmutable_value = get_inmutable_value({
	cubiertos: 70,
	semiCubiertos: 5,
	descubiertos_balcon: 10,
	descubiertos_patio: 0,
	expensas: 25000,
	impuestos_fijos: 10000,
	piso: 6,
	altura_total_edificio: 12,
	orientacion: 'NE',
	disposicion: 'frente',
	tipo: 'duplex'
})
ideal_average_value *= inmutable_value

// URL
const precio_base = 20000
const precio_techo = 200000
//console.log(get_url(precio_base, precio_techo))

// Report
const budget = 100000
const meters = 50
const listed_value = 70000
const negotiable_amount = 10000
const negotiable_price = listed_value - negotiable_amount
const listed_value_inside_budget = listed_value <= budget
const negotiable_price_inside_budget = negotiable_price <= budget

const report =
`
Presupuesto maximo: $${budget}.
Publicacion: $${listed_value}.
Esta dentro del presupuesto? ${listed_value_inside_budget ? 'Si' : 'No'}.
Se puede negociar dentro del presupuesto? Cuanto? ${negotiable_price_inside_budget ? 'Si' : 'No'}. $${negotiable_price}.
Precio de lista: $${listed_value} vs Precio ideal promedio $${ideal_average_value*meters}
De donde sale ese numero? Del calculo:
Precio promedio de cierre m2 de CABA (en USD ajustado por inflacion EEUU comienzo 2025): ${precio_promedio_cierre} ${data.unidad}.
Aplicamos sobre ese precio el Metodo 3 6 9 12:
Valor considerando factores de la locacion (Indice=${location_value}): ${precio_promedio_cierre*location_value} ${data.unidad}.
Valor considerando factores del edificio (Indice=${building_value}): ${precio_promedio_cierre*building_value} ${data.unidad}.
Valor considerando factores inmutables del inmueble (Indice=${inmutable_value}): ${precio_promedio_cierre*inmutable_value} ${data.unidad}.
`
console.log(report)