import { User } from "../entities/user.entity.js";
import { Person } from "../entities/person.entity.js";

export interface IUserRepository {
    create(user: User): Promise<User | undefined>;
    findWithPerson(user_id: number): Promise<User & Person | undefined>;
}