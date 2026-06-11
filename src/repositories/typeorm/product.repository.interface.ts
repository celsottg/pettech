import type { Repository } from "typeorm";
import type { IProduct } from "../../entities/models/product.interface.js";
import { Product } from "../../entities/product.entity.js";
import { appDataSource } from "../../lib/typeorm/typeorm.js";
import type { IProductRepository } from "../pg/product.repository.js";

export class ProductRepository implements IProductRepository {
    private repository: Repository<Product>;

    constructor(repository: Repository<Product>) {
        this.repository = appDataSource.getRepository(Product);
    }

    create(product: IProduct): Promise<IProduct> {
        return this.repository.save(product);
    }
}