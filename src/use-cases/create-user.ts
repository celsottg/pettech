import type { IUserRepository } from "../repositories/user.repository.interface.ts";
import { User } from "../entities/user.entity.js";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async handler(user: User): Promise<User | undefined> {
        return this.userRepository.create(user);
    }
}