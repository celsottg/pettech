import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import type { ICategory } from "../../../entities/models/category.interface.js";
import { makeCreateProductUseCase } from "../../../use-cases/factory/make-create-product-use-case.js";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
        price: z.coerce.number(),
        categories: z.array(
            z.object({
                id: z.number().optional(),
                name: z.string(),
            })
        ).optional(),
    })

    const { name, description, image_url, price, categories } = registerBodySchema.parse(request.body);

    const createProductUseCase = makeCreateProductUseCase();
    const product = await createProductUseCase.handler({
        name,
        description,
        image_url,
        price,
        ...(categories !== undefined && {
            categories: categories.map(({ name, id }): ICategory => ({
                name,
                ...(id !== undefined ? { id } : {}),
            })),
        }),
    });

    return reply.status(201).send(product);
}