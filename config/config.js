import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER, // root
    password: process.env.DB_PASS, // (rỗng)
    database: process.env.DB_NAME, // sneakershoe
    host: process.env.DB_HOST, // localhost
    port: 3306, // Cổng MySQL mặc định của XAMPP
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'database_test',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'database_production',
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql',
  },
};