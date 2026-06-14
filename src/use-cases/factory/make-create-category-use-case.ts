import { CategoryRepository } from "../../repositories/typeorm/category.repository.js";
import { CreateCategoryUseCase } from "../create-category.js";

export function makeCreateCategoryUseCase() {
    const categoryRepository = new CategoryRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    return createCategoryUseCase;
}