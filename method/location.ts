/*
3 variables de ubicacion
	1. Vecinos especiales:
		Restan absoluto 20%: Bomberos, autopistas, boliches, albergues transitorios, trenes, funerarias, hospitales, zonas rojas.
		Pueden sumar positivamente: parques, plazas, clubes.
	2. Iluminacion artificial en la cuadra: buena, mala, mediana.
	3. Arbolado de la cuadra: bueno, malo, mediano.
Ponderacion total: +-20%
*/
export type Iluminacion = 'buena' | 'mediana' | 'mala'
export type Arbolado = 'bueno' | 'mediano' | 'malo'

export default function get_location_value(
	vecinos: string[],
	iluminacion: Iluminacion,
	arbolado: Arbolado
): number {
	let ponderacion_total = 1
	let vecinos_valoracion = verify_neighbours(vecinos)
	console.log(`vecinos_valoracion: ${vecinos_valoracion}.`)

	if (vecinos_valoracion === 'negativo') {
		ponderacion_total = 0.8
	}
	else if (iluminacion !== 'mala' && arbolado !== 'malo') {
		ponderacion_total = 1.2
	}

	return ponderacion_total
}
function verify_neighbours(neighbour_list) {
	const negative_neighbours = ['bomberos', 'autopistas', 'boliches', 'albergues transitorios', 'trenes', 'funerarias', 'hospitales', 'zonas rojas']
	const positive_neighbours = ['parques', 'plazas', 'clubes']

	if (neighbour_list.some(neighbour => negative_neighbours.includes(neighbour))) return 'negativo'
	if (neighbour_list.some(neighbour => positive_neighbours.includes(neighbour))) return 'positivo'
	return 'neutro'
}