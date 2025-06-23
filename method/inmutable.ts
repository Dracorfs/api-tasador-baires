/*
Caracteristicas inmutables del departamento:
1. Superficie cubierta (cantidad de m2):
  a. 1.1 para departamentos de hasta 30m2
  b. 1.05 de 31 a 50 m2
  c. 1.0 de 51 a 100 m2
  d. 0.95 de 101 a 150m2
  e. 0.9 de 151 a 250m2
  f. 0.8 mas de 250m2
2. Superficie semi y descubierta (m2):
  0.5 a los m2 de galerias o lavaderos semicubiertos
  0.33 a los m2 descubiertos de balcones.
  0.2 a los m2 descubiertos de patios (con excepciones).
3. Valor de las expensas.
4. Valor de AySA y ABL (y otros fijos).
5. Altura en edificio:
  a. 0.9 planta baja o 1er.
  b. 0.95 2do y 3er.
  c. 1 4to y 5to.
  d. 1.05 6to y 7mo.
  e. 1.1 8vo y 9no.
  f. 1.15 >9no <ultimo
  g. 0.9 ultimo
6. Orientacion:
  a. N: 1.1
  b. E y O: 1
  c. S: 0.9
  d. NO y NE: 1.05
  e. SO y SE: 0.95
7. Disposicion:
Excepto en calles ruidosas, el frente vale 5% mas que el contrafrente.
  Frente: 1.05
  Contrafrente: 1
  Interno o lateral: 0.9
  Plano Invertido (Pasillo/living al pulmon y cuarto al frente): 0.9
8. Visuales (relativo)
9. Tipo:
140m2 duplex vale menos que en una sola planta.
2 ambientes en duplex (si hay bastante altura) vale mas que en una sola planta.
  Monoambiente
  Semipiso / Piso
  Duplex
*/
type Orientation = 'N' | 'E' | 'O' | 'S' | 'NE' | 'NO' | 'SE' | 'SO'
type Disposicion = 'frente' | 'contrafrente' | 'interno' | 'lateral' | 'plano_invertido'
type DepartamentoTipo = 'monoambiente' | 'semipiso' | 'piso' | 'duplex'

type InmutableInput = {
	cubiertos: number
	semiCubiertos: number
	descubiertos_balcon: number
	descubiertos_patio: number
	expensas: number
	impuestos_fijos: number
	piso: number
	orientacion: Orientation
	disposicion: Disposicion
	tipo: DepartamentoTipo
	altura_total_edificio: number
}


export default function get_inmutable_value(input: InmutableInput): number {
	let total = 1.0

	// 1. Superficie cubierta
	const { cubiertos, semiCubiertos, descubiertos_balcon, descubiertos_patio, piso, orientacion, disposicion, tipo, altura_total_edificio } = input

	if (cubiertos <= 30) total *= 1.1
	else if (cubiertos <= 50) total *= 1.05
	else if (cubiertos <= 100) total *= 1.0
	else if (cubiertos <= 150) total *= 0.95
	else if (cubiertos <= 250) total *= 0.9
	else total *= 0.8

	// 2. Semi y descubierta
	const m2_extra = semiCubiertos * 0.5 + descubiertos_balcon * 0.33 + descubiertos_patio * 0.2
	total += m2_extra / cubiertos // proportional

	// 5. Building floor
	let alturaFactor = 1
	if (piso <= 1) alturaFactor = 0.9
	else if (piso <= 3) alturaFactor = 0.95
	else if (piso <= 5) alturaFactor = 1.0
	else if (piso <= 7) alturaFactor = 1.05
	else if (piso <= 9) alturaFactor = 1.1
	else if (piso < altura_total_edificio - 1) alturaFactor = 1.15
	else alturaFactor = 0.9
	total *= alturaFactor

	// 6. Orientation
	const orientMap: Record<Orientation, number> = {
		N: 1.1,
		E: 1.0,
		O: 1.0,
		S: 0.9,
		NE: 1.05,
		NO: 1.05,
		SE: 0.95,
		SO: 0.95
	}
	total *= orientMap[orientacion]

	// 7. Disposition
	const dispoFactor: Record<Disposicion, number> = {
		frente: 1.05,
		contrafrente: 1.0,
		interno: 0.9,
		lateral: 0.9,
		plano_invertido: 0.9
	}
	total *= dispoFactor[disposicion]

	// 9. Type
	if (tipo === 'duplex') {
		if (cubiertos > 100) total *= 0.95
		else total *= 1.05
	}

	// 3 y 4 (expensas/impuestos) podrían evaluarse con más info (e.g. relación con el valor total)

	return parseFloat(total.toFixed(3))
}