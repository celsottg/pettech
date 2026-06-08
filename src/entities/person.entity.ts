import type { IPerson } from "./models/person.interface.js";

export class Person implements IPerson {
    constructor(cpf: string, name: string, birth: Date, email: string) {
        this.cpf = cpf;
        this.name = name;
        this.birth = birth;
        this.email = email;
    }
    id?: number;
    cpf: string;
    name: string;
    birth: Date;
    email: string;
    user_id?: number;
}