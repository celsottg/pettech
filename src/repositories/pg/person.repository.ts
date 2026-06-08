import { database } from "../../lib/pg/db.js";
import type { IPersonRepository } from "../../repositories/person.repository.interface.ts";
import type { IPerson } from "../../entities/models/person.interface.ts";

export class PersonRepository implements IPersonRepository {

    async create({cpf, name, birth, email, user_id}: IPerson): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`
            INSERT INTO person (cpf, name, birth, email, user_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [cpf, name, birth, email, user_id]);

        if (!result?.rows[0]) {
            throw new Error("Failed to create person");
        }

        return result.rows[0];
    }
}
