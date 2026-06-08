import type { IUserRepository } from "../repositories/user.repository.interface.ts";
import { User } from "../entities/user.entity.js";
import { Person } from "../entities/person.entity.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

export class FindWithPersonUseCase {
    constructor(private userRepository: IUserRepository) {}

    async handler(user_id: number): Promise<(User & Person) | undefined> {
        const user = await this.userRepository.findWithPerson(user_id);
        if (!user) {
            throw new ResourceNotFoundError();
        }
        return user;
    }
}