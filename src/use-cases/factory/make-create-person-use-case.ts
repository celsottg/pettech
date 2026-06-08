import { PersonRepository } from "../../repositories/pg/person.repository.js";
import { CreatePersonUseCase } from "../create-person.js";
import type { IPersonRepository } from "../../repositories/person.repository.interface.ts";

export function makeCreatePersonUseCase() {
    const personRepository = new PersonRepository() as IPersonRepository;
    const createPersonUseCase = new CreatePersonUseCase(personRepository);
    return createPersonUseCase;
}