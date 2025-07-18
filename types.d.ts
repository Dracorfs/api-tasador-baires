export type CoveredSurfaceRanges = "<30m2" | "<50m2" | "<100m2" | "<150m2" | "<250m2" | ">250m2"
export type Quality = "good" | "medium" | "bad"
export type Prestige = "high" | "medium" | "low"
export type Orientation = "N" | "E" | "W" | "S" | "NE" | "NW" | "SE" | "SW"
export type Layout = "front_facing" | "rear_facing" | "internal" | "lateral" | "reversed_plan"
export type ApartmentType = 'studio_apartment' | 'half_floor' | 'full_floor' | 'duplex'
export type Views = 'remarkable' | 'good' | 'common' | 'bad'
export type Neighbours = string[]
export type BedroomCount = "0" | "1" | "2"
export type AdressInfo = {
	street: string,
	number: number | null,
	apartment: number | null,
	between_streets: [string, string]
}
type BedroomStats = {
	m2: number
	monthly_rent_ARS: number
	annual_rent_USD: number
	listed_value: number | null
	closing_price_USD_m2: number
	closing_price_USD: number
}
export type AverageValuePerBedroom = {
	updated_date: string
} & {
	[key in BedroomCount]: BedroomStats
}
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
	address: AdressInfo
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
	bedrooms: BedroomCount
}