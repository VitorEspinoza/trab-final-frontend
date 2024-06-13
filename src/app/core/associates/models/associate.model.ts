import { User } from "../../auth/models/user.model"
import { Address } from "../../shared/models/address.model"

export interface Associate {
  associateId: string,
  phone: string,
  birthAt: Date,
  document: string,
  healthInsuranceIdentifier: string,
  addressId: string,
  address: Address,
  user: User
}
