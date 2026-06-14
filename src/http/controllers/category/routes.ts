import { create } from "./create.js";
import type { FastifyInstance } from "fastify";

export async function categoryRoutes(app: FastifyInstance) {
    app.post('/category', create);
}