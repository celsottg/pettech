import type { FastifyInstance } from "fastify";
import { create } from "./create.js";

export async function personRoutes(app: FastifyInstance) {
    app.post('/person', create);
}
