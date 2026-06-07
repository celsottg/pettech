import fastify from "fastify";
import { personRoutes } from "./http/controllers/person/routes.js";
import { userRoutes } from "./http/controllers/user/routes.js";
import { globalErrorHandler } from "./utils/global-error-handler.js";

export const app = fastify();

app.register(personRoutes);
app.register(userRoutes);

app.setErrorHandler(globalErrorHandler);