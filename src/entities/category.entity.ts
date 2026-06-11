import type { ICategory } from "./models/category.interface.js";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({
    name: "category",
})

export class Category implements ICategory {
    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id?: number;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        name: "created_at",
        type: "timestamp without time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    })
    created_at?: Date;
}