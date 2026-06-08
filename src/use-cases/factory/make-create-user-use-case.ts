import { UserRepository } from "../../repositories/pg/user.repository.js";
import { CreateUserUseCase } from "../create-user.js";
import type { IUserRepository } from "../../repositories/user.repository.interface.ts";

export function makeCreateUserUseCase() {
    const userRepository = new UserRepository() as IUserRepository;

    const createUserUseCase = new CreateUserUseCase(userRepository);

    return createUserUseCase;
}