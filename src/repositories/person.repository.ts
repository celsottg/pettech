import { Person } from "../entities/person.entity.js";

export class PersonRepository {
    async findById(id:number): Promise<Person> {
        return {
            id,
            name: 'John Doe',
            email: 'john.doe@example.com',
            birth: new Date('1990-01-01'),
            cpf: '12345678900',
            user_id: 1,
        }
    }
    async create(person: Person): Promise<Person> {
        return person
    }
}