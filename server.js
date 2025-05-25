import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import initWebRoute from "./src/routes/routersApi.js";
import connectDB from "./config/connectDB.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';



// Load biến môi trường từ .env
dotenv.config();

const app = express();

// Cấu hình CORS thủ công
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Setup Swagger route
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware xử lý JSON và form data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gọi cấu hình view và routes
initWebRoute(app);

// Kết nối DB
connectDB();

const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("✅ Connect DB successfully");
    console.log("✅ Backend NodeJs is running on the port: " + port);
    console.log(`Swagger UI available at: http://localhost:${port}`);
});