//Precio de cierre m2 de CABA (en USD ajustado por inflacion EEUU comienzo 2025)

import get_location_value from "./method/location.ts"

//recurso: usinflationcalculator.com/inflation/calculator-cumulative/
const today = new Date()
const data = {
	"unidad": "USD por m²",
	"precios_promedio_cierre": {
		2010: 2207,
		2011: 2346,
		2012: 2477,
		2013: 2502,
		2014: 2799,
		2015: 3151,
		2016: 3387,
		2017: 3605,
		2018: 3120,
		2019: 2752,
		2020: 2578,
		2021: 2361,
		2022: 1931,
		2023: 1837,
		2024: 1988,
		2025: 2200
	},
	"variaciones": [
		{"periodo": "1977-1981", "variación": "+171%"},
		{"periodo": "1981-1989", "variación": "-76%"},
		{"periodo": "1989-1993", "variación": "+115%"},
		{"periodo": "1993-2002", "variación": "-54%"},
		{"periodo": "2002-2017", "variación": "+238%"},
		{"periodo": "2017-2023", "variación": "-49%"},
		{"periodo": "2023-2025", "variación": "+20%"}
	],
	"maxmin": {
		"techo": {"año": 1981, "precio": 4574},
		"piso": {"año": 2002, "precio": 1066}
	}
}
let precio_promedio_cierre = data.precios_promedio_cierre[today.getFullYear()]
console.log(`Precio promedio de cierre: ${precio_promedio_cierre} ${data.unidad}.`)

// Metodo 3 6 9 12
let value = precio_promedio_cierre

let location_value = get_location_value(['parques'], 'mediana', 'bueno')
console.log(location_value)

value = precio_promedio_cierre * location_value
console.log(`Valor considerando la locacion (Indice=${location_value}): ${value} ${data.unidad}.`)

// URL
const precio_base = 20000
const precio_techo = 200000
const parameter = `-${precio_base}-${precio_techo}-dolar`
const orden = `-orden-precio-m2-ascendente`
const url_base = `https://www.zonaprop.com.ar/departamentos-venta${parameter+orden}.html`
console.log(url_base)