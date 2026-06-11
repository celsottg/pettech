import type { FastifyInstance } from "fastify";
import { create } from "./create.js";

export async function productRoutes(app: FastifyInstance) {
    app.post('/product', create);
}