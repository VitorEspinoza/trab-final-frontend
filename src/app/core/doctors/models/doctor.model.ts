import { Specialty } from "../../specialties/models/specialty.model"
import { Unit } from "../../units/models/unit.model"

export interface Doctor {
	doctorId: string,
	document: string,
	medicalRegistrationNumber: string,
	name: string,
  unit: Unit,
	specialties: Specialty[]
}
