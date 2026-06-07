import { PersonRepository } from "../../repositories/person.repository.js";
import { CreatePersonUseCase } from "../create-person.js";

export function makeCreatePersonUseCase() {
    const personRepository = new PersonRepository();

    const createPersonUseCase = new CreatePersonUseCase(personRepository);

    return createPersonUseCase;
}