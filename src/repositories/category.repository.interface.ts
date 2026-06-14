import type { IProduct } from "../entities/models/product.interface.js";

export interface ICategoryRepository {
    create(name: string, products?: IProduct[]): Promise<void>;
}