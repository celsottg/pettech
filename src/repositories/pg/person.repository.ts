import { Person } from "../../entities/person.entity.js";
import { database } from "../../lib/pg/db.js";
import type { IPersonRepository } from "../../repositories/person.repository.interface.ts";

export class PersonRepository implements IPersonRepository {

    async create({cpf, name, birth, email, user_id}: Person): Promise<Person | undefined> {
        const result = await database.clientInstance?.query<Person>(`
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
