import express from "express";
let router = express.Router();



const initWebRoute = (app) => {
    router.get('/', (req, res) => {
        res.send("Hello from Home Route!");
    });
}

export default initWebRoute;
