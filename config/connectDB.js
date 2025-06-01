import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('❌ Cannot connect to DB:', err);
    } else {
        console.log('✅ Connected to MySQL DB');
    }
});


export default connectDB;
