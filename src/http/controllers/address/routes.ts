import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { findAddress } from "./find-address.js";

export async function addressRoutes(app: FastifyInstance) {
    app.post('/address', create);
    app.get('/address/person/:person_id', findAddress);
}