import type { ICategory } from "./category.interface.js";

export interface IProduct {
    id?: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    categories?: ICategory[];
}