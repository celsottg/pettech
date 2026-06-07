import { UserRepository } from "../../repositories/user.repository.js";
import { CreateUserUseCase } from "../create-user.js";

export function makeCreateUserUseCase() {
    const userRepository = new UserRepository();

    const createUserUseCase = new CreateUserUseCase(userRepository);

    return createUserUseCase;
}