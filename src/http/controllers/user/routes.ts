import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { findWithPerson } from "./find-user.js";

export async function userRoutes(app: FastifyInstance) {
    app.get('/user/:id', findWithPerson);
    app.post('/user', create);
}