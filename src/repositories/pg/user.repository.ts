import type { IUserRepository } from "../../repositories/user.repository.interface.ts";
import type { IUser } from "../../entities/models/user.interface.ts";
import type { IPerson } from "../../entities/models/person.interface.ts";
import { database } from "../../lib/pg/db.js";

export class UserRepository implements IUserRepository {
    public async create({username, password}: IUser): Promise<IUser | undefined> {
        const result = await database.clientInstance?.query<IUser>(`
            INSERT INTO "user" (username, password)
            VALUES ($1, $2)
            RETURNING *
        `, [username, password]);
        return result?.rows[0];
    }

    public async findWithPerson(user_id: number): Promise<(IUser & IPerson) | undefined> {
        const result = await database.clientInstance?.query<IUser & IPerson>(`
            SELECT * FROM "user" LEFT JOIN person ON "user".id = person.user_id WHERE "user".id = $1
        `, [user_id]);
        return result?.rows[0];
    }
}