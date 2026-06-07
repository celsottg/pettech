import { UserRepository } from "../../repositories/user.repository.js";
import { FindWithPersonUseCase } from "../find-with-person.js";

export function makeFindWithPersonUseCase() {
    const userRepository = new UserRepository();

    const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);

    return findWithPersonUseCase;
}