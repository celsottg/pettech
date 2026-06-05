import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../entities/user.entity.js";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async handler(user: User): Promise<User | undefined> {
        return this.userRepository.create(user);
    }
}