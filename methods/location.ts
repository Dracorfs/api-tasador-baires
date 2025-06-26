/*
3 location variables:
	1. Special neighbours:
		Absolute -20%: Bomberos, autopistas, boliches, albergues transitorios, trenes, funerarias, hospitales, zonas rojas.
		Might add value: parques, plazas, clubes.
	2. Artificial lighting of the block.
	3. Greenery.
Total: +-20%
*/
export type Quality = 'good' | 'medium' | 'bad'
export type Neighbours = string[]

export default function get_location_value(
	neighbours: Neighbours,
	lighting: Quality,
	greenery: Quality
): number {
	let ponderacion_total = 1
	const vecinos_valoracion = verify_neighbours(neighbours)

	if (vecinos_valoracion === 'negative') {
		ponderacion_total = 0.8
	}
	else if (lighting !== 'bad' && greenery !== 'bad') {
		ponderacion_total = 1.2
	}

	return ponderacion_total
}
function verify_neighbours(neighbour_list: Neighbours) {
	const negative_neighbours = ['bomberos', 'autopistas', 'boliches', 'albergues transitorios', 'trenes', 'funerarias', 'hospitales', 'zonas rojas']
	const positive_neighbours = ['parques', 'plazas', 'clubes']

	if (neighbour_list.some(neighbour => negative_neighbours.includes(neighbour))) return 'negative'
	if (neighbour_list.some(neighbour => positive_neighbours.includes(neighbour))) return 'positive'
	return 'neutro'
}