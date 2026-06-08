import type { IAddress } from "../entities/models/address.interface.ts";
import type { IAddressRepository } from "../repositories/address.repository.interface.ts";

export class CreateAddressUseCase {
    constructor(private addressRepository: IAddressRepository) {}

    async handler(address: IAddress): Promise<IAddress | undefined> {
        return this.addressRepository.create(address);
    }
}