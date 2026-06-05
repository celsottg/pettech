export class User {
    id?: number
    username: string
    password:string
    created_at?: Date
    updated_at?: Date

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}