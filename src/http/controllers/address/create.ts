import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateAddressUseCase } from "../../../use-cases/factory/make-create-address-use-case.js";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        street: z.string(),
        number: z.coerce.number(),
        complement: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zip_code: z.string(),
        person_id: z.number(),
    })

    const { street, number, complement, neighborhood, city, state, zip_code, person_id } = registerBodySchema.parse(request.body);

    const createAddressUseCase = makeCreateAddressUseCase();
    const address = await createAddressUseCase.handler({ street, number, complement, neighborhood, city, state, zip_code, person_id });

    return reply.status(201).send(address);
}