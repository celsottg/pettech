import fastify from "fastify";
import { z, ZodError } from "zod";
import { ResourceNotFoundError } from "../use-cases/errors/resource-not-found-error.js";
import { env } from "../env/index.js";

export const globalErrorHandler = (
    error: Error,
    _: fastify.FastifyRequest,
    reply: fastify.FastifyReply,
) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            errors: z.treeifyError(error),
        });
    }

    if (error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message });
    }

    if (env.NODE_ENV === "development") {
        console.error(error);
    }

    return reply.status(500).send({ message: "Internal server error" });
};
