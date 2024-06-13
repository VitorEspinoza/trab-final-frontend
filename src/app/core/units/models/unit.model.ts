import { Address } from "cluster";
import { Specialty } from "../../specialties/models/specialty.model";

export interface Unit {
    unitId: string,
		address: Address,
		displayName: string,
    name: string,
    specialties: Specialty[]
}
