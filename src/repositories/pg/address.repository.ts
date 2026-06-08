import { Address } from "../../entities/address.entity.js";
import type { Person } from "../../entities/person.entity.js";
import { database } from "../../lib/pg/db.js";
import type { IAddressRepository } from "../../repositories/address.repository.interface.ts";
import type { IAddress } from "../../entities/models/address.interface.ts";
import type { IPerson } from "../../entities/models/person.interface.ts";

export class AddressRepository implements IAddressRepository {
    async findAddressesByPersonId(person_id: number, page: number, limit: number): Promise<IAddress[] & IPerson[]> {
        const offset = (page - 1) * limit;

        const query = `
            SELECT address.*, person.* FROM address
            LEFT JOIN person ON address.person_id = person.id
            WHERE person.id = $1
            ORDER BY address.id DESC
            LIMIT $2
            OFFSET $3
        `;

        const result = await database.clientInstance?.query<Address & Person>(query, [person_id, limit, offset]);
        return result?.rows || [];
    }
    async create({street, number, complement, neighborhood, city, state, zip_code, person_id}: IAddress): Promise<IAddress | undefined> {
        const result = await database.clientInstance?.query<IAddress>(`
            INSERT INTO address (street, number, complement, neighborhood, city, state, zip_code, person_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [street, number, complement, neighborhood, city, state, zip_code, person_id]);   
        return result?.rows[0];
    }
}