import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,      // database name
    process.env.DB_USER,      // username
    process.env.DB_PASS,      // password
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',      // ⚠️ phải khai báo rõ dialect
        port: process.env.DB_PORT || 3306,      // (tuỳ chọn) để tắt log SQL query
    }
);


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDB;
