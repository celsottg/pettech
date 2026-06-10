import { AddressRepository } from "../../repositories/pg/address.repository.js";
import { FindAddressByPersonUseCase } from "../find-address-by-person.js";

export function makeFindAddressByPersonUseCase() {
    const addressRepository = new AddressRepository();
    return new FindAddressByPersonUseCase(addressRepository);
}