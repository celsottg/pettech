import { Category } from "./category.entity.js";
import type { ICategory } from "./models/category.interface.js";
import type { IProduct } from "./models/product.interface.js";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity({
    name: "product",
})

export class Product implements IProduct {
    @PrimaryGeneratedColumn("uuid", {
        name: "id",
    })
    id?: string;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: "description",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    description: string;

    @Column({
        name: "image_url",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    image_url: string;

    @Column({
        name: "price",
        type: "double precision",
        nullable: false,
    })
    price: number;

    @ManyToMany(() => Category, {
        cascade: true,
    })
    @JoinTable({
        name: "product_category",
        joinColumn: {
            name: "product_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id",
        },
    })
    categories?: ICategory[];
}