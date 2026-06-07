import fastify from "fastify";
import { personRoutes } from "./http/controllers/person/routes.js";
import { userRoutes } from "./http/controllers/user/routes.js";
import { z, ZodError } from "zod";
import { env } from "./env/index.js";
import { ResourceNotFoundError } from "./use-cases/errors/resource-not-found-error.js";

export const app = fastify();

app.register(personRoutes);
app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error", errors: z.treeifyError(error) });
    }

    if(error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message });
    }

    if(env.NODE_ENV === 'development') {
        console.error(error);
    }

    return reply.status(500).send({ message: 'Internal server error' });
});