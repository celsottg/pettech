import type { IUser } from "./models/user.interface.js";

export class User implements IUser   {
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    id?: number;
    username: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}