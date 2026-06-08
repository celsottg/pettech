import type { IAddress } from "./models/address.interface.ts";

export class Address implements IAddress {
    constructor(street: string, number: string, complement: string, neighborhood: string, city: string, state: string, zip_code: string) {
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood ?? "";
        this.city = city ?? "";
        this.state = state ?? "";
        this.zip_code = zip_code ?? "";
    }
    id?: number;
    person_id?: number;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
}