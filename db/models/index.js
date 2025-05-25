import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import configObj from '../../config/config.js';
import { fileURLToPath, pathToFileURL } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configObj[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter(
    file => file !== basename && file.endsWith('.js')
);

for (const file of files) {
    const filePath = pathToFileURL(path.join(__dirname, file)).href;
    const { default: model } = await import(filePath);
    const modelInstance = model(sequelize, DataTypes);
    db[modelInstance.name] = modelInstance;
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;