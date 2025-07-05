export type Quality = "good" | "medium" | "bad"
export type Prestige = "high" | "medium" | "low"
export type Orientation = "N" | "E" | "W" | "S" | "NE" | "NW" | "SE" | "SW"
export type Layout = "front_facing" | "rear_facing" | "internal" | "lateral" | "reversed_plan"
export type ApartmentType = 'studio_apartment' | 'half_floor' | 'full_floor' | 'duplex'
export type Views = 'remarkable' | 'good' | 'common' | 'bad'
export type Neighbours = string[]
export interface InmutableData {
	covered_surface: number
	semi_covered_surface: number
	uncovered_surface_balcony: number
	uncovered_surface_backyard: number
	maintenance_fees: number
	fixed_costs_and_taxes: number
	floor: number
	orientation: Orientation
	layout: Layout
	type: ApartmentType
	building_highest_floor: number,
	views: Views
}
export interface ConditionData {
	kitchen: Quality
	bathrooms: Quality
	walls: Quality
	floors: Quality
	closets: Quality
	water: Quality
	gas: Quality
	electricity: Quality
	drainage: Quality
	heating: Quality
	cooling: Quality
	ventilation: Quality
}
export interface ValuationInput {
	neighbours: string[]
	lighting: Quality
	greenery: Quality
	age: number
	quality: Quality
	common_space: Quality
	central_services: Quality
	exterior: Quality
	prestige: Prestige
	inmutable: InmutableData
	condition: ConditionData
	listed_value: number
}