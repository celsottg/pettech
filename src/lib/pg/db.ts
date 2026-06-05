import { Pool, type PoolClient } from 'pg';
import { env } from '../../env/index.js';

const CONFIG = {
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT,
}

class Database {
    private pool: Pool;
    private client: PoolClient | undefined;

    constructor() {
        this.pool = new Pool(CONFIG);
        this.connection();
    }

    private async connection() {
        try {
            this.client = await this.pool.connect();
        } catch (error) {
            console.error('Error connecting to the database', error);
            throw new Error('Error connecting to the database');
        }
    }

    private async disconnect() {
        try {
            await this.client?.release();
        } catch (error) {
            console.error('Error disconnecting from the database', error);
            throw new Error('Error disconnecting from the database');
        }
    }
    get clientInstance() {
        return this.client;
    }
}

export const database = new Database();