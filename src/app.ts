import fastify from "fastify";
import { personRoutes } from "./http/controllers/person/routes.js";

export const app = fastify();

app.register(personRoutes);