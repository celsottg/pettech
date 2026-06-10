import { DataSource } from "typeorm";
import { env } from "../../env/index.js"
import { Product } from "../../entities/product.entity.js";
import { Category } from "../../entities/category.entity.js";

export const appDataSource = new DataSource({
    type: "postgres",
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [Product, Category],
    logging: env.NODE_ENV === "development",
    synchronize: true,
});

appDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((error) => {
    console.error("Error initializing Data Source", error);
});