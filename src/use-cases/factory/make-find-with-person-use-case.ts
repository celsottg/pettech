import { UserRepository } from "../../repositories/pg/user.repository.js";
import { FindWithPersonUseCase } from "../find-with-person.js";
import type { IUserRepository } from "../../repositories/user.repository.interface.ts";
export function makeFindWithPersonUseCase() {
    const userRepository = new UserRepository() as IUserRepository  ;

    const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);

    return findWithPersonUseCase;
}