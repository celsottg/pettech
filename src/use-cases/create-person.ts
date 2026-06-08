import { Person } from "../entities/person.entity.js";
import type { IPersonRepository } from "../repositories/person.repository.interface.ts";

export class CreatePersonUseCase {
    constructor(private personRepository: IPersonRepository) {}

    handler(person: Person) {
        return this.personRepository.create(person);
    }
}