import { User } from "../../auth/models/user.model"
import { Address } from "../../shared/models/address.model"

export interface Associate {
  associateId: String,
  phone: String,
  birthAt: Date,
  document: String,
  healthInsuranceIdentifier: String,
  addressId: String,
  address: Address,
  user: User
}
