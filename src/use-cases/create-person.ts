import { PersonRepository } from "../repositories/person.repository.js";
import { Person } from "../entities/person.entity.js";

export class CreatePersonUseCase {
    constructor(private personRepository: PersonRepository) {}

    handler(person: Person) {
        return this.personRepository.create(person);
    }
}