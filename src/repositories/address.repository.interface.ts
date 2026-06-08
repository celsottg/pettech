import type { IPerson } from "../entities/models/person.interface.js";
import type { IAddress } from "../entities/models/address.interface.js";

export interface IAddressRepository {
    findAddressesByPersonId(person_id: number, page: number, limit: number): Promise<IAddress[] & IPerson[]>;
    create(address: IAddress): Promise<IAddress | undefined>;
}