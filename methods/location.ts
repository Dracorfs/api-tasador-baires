import type { Neighbours, Quality } from "../types.d.ts"

/**
 * Calculates a factor based on the location and immediate environment of the property. Total: +-20%.
 * 
 * It takes into account proximity to special neighbors (e.g., parks, hospitals),
 * lighting, and tree coverage of the block.
 *
 * @param neighbours - Array of nearby elements (fire stations, highways, nightclubs, love hotels, railways, funeral homes, hospitals, red-light districts, parks, clubs).
 * @param lighting - Quality of artificial lighting in the block ('good' | 'medium' | 'bad').
 * @param greenery - Quality of the tree presence and greenery in the block ('good' | 'medium' | 'bad').
 * @returns A number (usually between 0.8 and 1.2) that modifies the base value depending on location.
 */
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