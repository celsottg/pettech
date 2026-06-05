import fastify from "fastify";
import { z } from "zod";
import { UserRepository } from "../../../repositories/user.repository.js";
import { CreateUserUseCase } from "../../../use-cases/create-user.js";

export async function create(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string(),
    })

    const { username, password } = registerBodySchema.parse(request.body);

    try {
        const userRepository = new UserRepository();
        const createUserUseCase = new CreateUserUseCase(userRepository);
        const user = await createUserUseCase.handler({ username, password });
        if (!user) {
            return reply.status(400).send({ message: 'User already exists' });
        }
        return reply.status(201).send({ message: `User created successfully: ${user.username}` });
    } catch (error) {
        console.error(error);   
        return reply.status(500).send({ message: 'Internal server error' });
    }
}