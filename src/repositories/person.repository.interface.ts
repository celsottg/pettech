import { Person } from "../entities/person.entity.js";

export interface IPersonRepository {
    create(person: Person): Promise<Person | undefined>;
}