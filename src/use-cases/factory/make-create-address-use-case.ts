import { AddressRepository } from "../../repositories/pg/address.repository.js";
import { CreateAddressUseCase } from "../create-address.js";

export function makeCreateAddressUseCase() {
    const addressRepository = new AddressRepository();
    return new CreateAddressUseCase(addressRepository);
}