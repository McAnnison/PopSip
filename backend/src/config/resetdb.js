import { query } from "./database.js";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resetdb = async () => {
    try {
        console.log('resetting database');
        
        await query('DROP DATABASE IF EXISTS popsip');
        
        const schemaSQL = await fs.readFile(path.join(__dirname, '../../schema.sql'), 'utf8');
        
        const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
        
        for (const statement of statements) {
            if (statement.trim()) {
                await query(statement);
            }
        }
        
        console.log('db reset success');
        process.exit(0);
    } catch (error) {
        console.error('db reset failure', error);
        process.exit(1);
    }
}

resetdb();