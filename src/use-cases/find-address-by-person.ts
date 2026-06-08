import type { IAddressRepository } from "../repositories/address.repository.interface.ts";
import type { IAddress } from "../entities/models/address.interface.ts";
import type { IPerson } from "../entities/models/person.interface.js";

export class FindAddressByPersonUseCase {
    constructor(private addressRepository: IAddressRepository) {}

    async handler(person_id: number, page: number, limit: number): Promise<IAddress[] & IPerson[]> {
        return this.addressRepository.findAddressesByPersonId(person_id, page, limit);
    }
}