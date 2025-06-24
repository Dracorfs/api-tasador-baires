export default function get_report(ideal_average_value: number, precio_promedio_cierre: number, unidad: string, location_value: number, building_value: number, inmutable_value: number) {
	const budget = 100000
	const meters = 50
	const listed_value = 70000
	const negotiable_amount = 10000
	const negotiable_price = listed_value - negotiable_amount
	const listed_value_inside_budget = listed_value <= budget
	const negotiable_price_inside_budget = negotiable_price <= budget
	
	return `
	Presupuesto maximo: $${budget}.
	Publicacion: $${listed_value}.
	Esta dentro del presupuesto? ${listed_value_inside_budget ? 'Si' : 'No'}.
	Se puede negociar dentro del presupuesto? Cuanto? ${negotiable_price_inside_budget ? 'Si' : 'No'}. $${negotiable_price}.
	Precio de lista: $${listed_value} vs Precio ideal promedio $${ideal_average_value*meters}
	De donde sale ese numero? Del calculo:
	Precio promedio de cierre m2 de CABA (en USD ajustado por inflacion EEUU comienzo 2025): ${precio_promedio_cierre} ${unidad}.
	Aplicamos sobre ese precio el Metodo 3 6 9 12:
	Valor considerando factores de la locacion (Indice=${location_value}): ${precio_promedio_cierre*location_value} ${unidad}.
	Valor considerando factores del edificio (Indice=${building_value}): ${precio_promedio_cierre*building_value} ${unidad}.
	Valor considerando factores inmutables del inmueble (Indice=${inmutable_value}): ${precio_promedio_cierre*inmutable_value} ${unidad}.
	`
}