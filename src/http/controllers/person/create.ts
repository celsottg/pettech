import fastify from "fastify";
import { z } from "zod";
import { PersonRepository } from "../../../repositories/person.repository.js";
import { CreatePersonUseCase } from "../../../use-cases/create-person.js";

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
        const personRepository = new PersonRepository();
        const createPersonUseCase = new CreatePersonUseCase(personRepository);
        
        await createPersonUseCase.handler({ cpf, name, email, birth, user_id });

        return reply.status(201).send({ message: 'Person created successfully' });
    } catch (error) {
        throw new Error('Internal server error');
    }
}
