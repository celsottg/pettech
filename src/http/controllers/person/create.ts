import fastify from "fastify";
import { z } from "zod";
import { makeCreatePersonUseCase } from "../../../use-cases/factory/make-create-person-use-case.js";

export async function create(request:fastify.FastifyRequest, reply:fastify.FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        birth: z.coerce.date(),
        cpf: z.string(),
        user_id: z.coerce.number(),
    })

    const { cpf, name, email, birth, user_id } = registerBodySchema.parse(request.body);

    try {
        const createPersonUseCase = makeCreatePersonUseCase();
        
        await createPersonUseCase.handler({ cpf, name, email, birth, user_id });

        return reply.status(201).send({ message: 'Person created successfully' });
    } catch (error) {
        throw new Error('Internal server error');
    }
}
