/*
3 location variables:
	1. Special neighbours:
		Absolute -20%: fire stations, highways, nightclubs, love hotels, railways, funeral homes, hospitals, red-light districts.
		Might add value: parks, clubs.
	2. Artificial lighting of the block.
	3. Greenery.
Total: +-20%
*/
import type { Neighbours, Quality } from "../types.d.ts"

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
	const negative_neighbours = ['fire-stations','highways','nightclubs','love-hotels','railways','funeral-homes','hospitals','red-light-districts']
	const positive_neighbours = ['parks','clubs']

	if (neighbour_list.some(neighbour => negative_neighbours.includes(neighbour))) return 'negative'
	if (neighbour_list.some(neighbour => positive_neighbours.includes(neighbour))) return 'positive'
	return 'neutro'
}