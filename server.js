import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import initWebRoute from "./src/routes/routers.js";
import connectDB from "./src/config/connectDB.js";



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

// Middleware xử lý JSON và form data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Gọi cấu hình view và routes
initWebRoute(app);

// Kết nối DB
connectDB();

const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("✅ Backend NodeJs is running on the port: " + port);
});
