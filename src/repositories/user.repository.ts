import { User } from "../entities/user.entity.js";
import { database } from "../lib/pg/db.js";

export class UserRepository {
    public async create({username, password}: User): Promise<User | undefined> {
        const result = await database.clientInstance?.query<User>(`
            INSERT INTO "user" (username, password)
            VALUES ($1, $2)
            RETURNING *
        `, [username, password]);
        return result?.rows[0];
    }
}