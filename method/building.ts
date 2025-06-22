/*
Edificio:
    1. Edad
    2. Calidad constructiva
    3. Categoria
    4. Espacios comunes
    5. Servicios centrales
    6. Exteriores (paredes, medianeras, puertas,etc)
Total: +-10%
*/
export type Quality = 'good' | 'medium' | 'bad'

export default function get_building_value(
	age: number,
	quality: Quality,
	common_space: Quality,
    central_services: Quality,
    exterior: Quality
): number {
	let total = 1.0

	// 1. Age
	if (age > 50)
		total -= 0.03
    else if (age < 10)
		total += 0.01

	// 2. Constructive quality
	if (quality === 'good')
		total += 0.03
	else if (quality === 'bad')
		total -= 0.03

	// 3. Common spaces
	if (common_space === 'good')
		total += 0.01
	else if (common_space === 'bad')
		total -= 0.01

	// 4. Central services
	if (central_services === 'good')
		total += 0.01
	else if (central_services === 'bad')
		total -= 0.01

	// 5. Exteriors
	if (exterior === 'good')
		total += 0.02
	else if (exterior === 'bad')
		total -= 0.02

	// Limitar al rango [0.9, 1.1]
	return Math.max(0.9, Math.min(1.1, parseFloat(total.toFixed(3))))
}