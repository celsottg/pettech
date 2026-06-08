import { Address } from "../entities/address.entity.js";
import { Person } from "../entities/person.entity.js";

export interface IAddressRepository {
    findAddressesByPersonId(person_id: number, page: number, limit: number): Promise<Address[] & Person[]>;
    create(address: Address & Person): Promise<Address | undefined>;
}