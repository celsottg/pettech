import type { IProduct } from "../../entities/models/product.interface.js";

export interface IProductRepository {
    create(product: IProduct): Promise<IProduct>;
}