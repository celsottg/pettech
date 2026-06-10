import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFindAddressByPersonUseCase } from "../../../use-cases/factory/make-find-address-by-person-use-case.js";

export async function findAddress(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        person_id: z.coerce.number(),
    })

    const registerQuerySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10),
    })

    const { person_id } = registerParamsSchema.parse(request.params);
    const { page, limit } = registerQuerySchema.parse(request.query);

    const findAddressByPersonUseCase = makeFindAddressByPersonUseCase();
    const address = await findAddressByPersonUseCase.handler(person_id, page, limit);

    return reply.status(200).send(address);
}