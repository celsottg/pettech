import { Product } from "../../entities/product.entity.js";
import { appDataSource } from "../../lib/typeorm/typeorm.js";
import { ProductRepository } from "../../repositories/typeorm/product.repository.interface.js";
import { CreateProductUseCase } from "../create-product.js";

export function makeCreateProductUseCase() {
    const productRepository = new ProductRepository(appDataSource.getRepository(Product));
    const createProductUseCase = new CreateProductUseCase(productRepository);

    return createProductUseCase;
}