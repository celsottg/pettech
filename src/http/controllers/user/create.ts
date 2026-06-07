import fastify from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../../../use-cases/factory/make-create-user-use-case.js";

export async function create(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string(),
    })

    const { username, password } = registerBodySchema.parse(request.body);

    try {
        const createUserUseCase = makeCreateUserUseCase();
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