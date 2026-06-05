import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../entities/user.entity.js";
import { Person } from "../entities/person.entity.js";

export class FindWithPersonUseCase {
    constructor(private userRepository: UserRepository) {}

    async handler(user_id: number): Promise<(User & Person) | undefined> {
        return this.userRepository.findWithPerson(user_id);
    }
}