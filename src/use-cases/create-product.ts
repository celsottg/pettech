import type { IProduct } from "../entities/models/product.interface.js";
import type { IProductRepository } from "../repositories/pg/product.repository.js";

export class CreateProductUseCase {
    constructor(private productRepository: IProductRepository) {}

    async handler(product: IProduct): Promise<IProduct> {
        return this.productRepository.create(product);
    }
}