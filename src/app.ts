import "reflect-metadata";
import "./lib/typeorm/typeorm.js";
import fastify from "fastify";
import { personRoutes } from "./http/controllers/person/routes.js";
import { userRoutes } from "./http/controllers/user/routes.js";
import { globalErrorHandler } from "./utils/global-error-handler.js";
import { addressRoutes } from "./http/controllers/address/routes.js";

export const app = fastify();

app.register(personRoutes);
app.register(userRoutes);
app.register(addressRoutes);

app.setErrorHandler(globalErrorHandler);