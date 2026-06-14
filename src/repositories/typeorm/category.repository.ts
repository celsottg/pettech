import type { Repository } from "typeorm";
import type { ICategoryRepository } from "../category.repository.interface.js";
import { Category } from "../../entities/category.entity.js";
import { appDataSource } from "../../lib/typeorm/typeorm.js";

export class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = appDataSource.getRepository(Category);
    }

    async create(name: string): Promise<void> {
        await this.repository.save( { name });
    }
}