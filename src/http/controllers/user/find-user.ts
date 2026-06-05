import fastify from "fastify";
import { z } from "zod";
import { UserRepository } from "../../../repositories/user.repository.js";
import { FindWithPersonUseCase } from "../../../use-cases/find-with-person.js";

export async function findWithPerson(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const registerParamsSchema = z.object({
        id: z.coerce.number(),
    })

    const { id } = registerParamsSchema.parse(request.params);

    try {
        const userRepository = new UserRepository();
        const findWithPersonUseCase = new FindWithPersonUseCase(userRepository);
        const user = await findWithPersonUseCase.handler(id);
        if (!user) {
            return reply.status(404).send({ message: 'User not found' });
        }
        return reply.status(200).send(user);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Find User error' });
    }
}