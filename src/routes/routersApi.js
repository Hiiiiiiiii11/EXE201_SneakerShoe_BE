import express from "express";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/roleController.js";
import { handleCreateNewCategory, handleDeleteCategory, handleGetAllCategory, handleUpdateCategory } from "../controllers/categoryController.js";
import { handleUpLoadImage } from "../controllers/uploadController.js";
import uploadService from "../services/uploadService.js";
import { handleCreateNewProduct, handleDeleteProduct, handleGetAllProduct, handleGetProductByPage, handleUpdateProduct } from "../controllers/productController.js";
let router = express.Router();

const initWebRoute = (app) => {


    app.get('/', (req, res) => {
        res.send('Welcome to Sneaker Shoe API backend');
    });
    //api CRUD roles
    router.get('/get-all-roles', handleGetAllRoles);
    router.post('/create-new-role', handleCreateNewRole);
    router.put('/update-role/:id', handleUpdateRole);
    router.delete('/delete-role/:id', handleDeleteRole);

    //api create user for admin role
    // router.post('/admin/create-user',handleCreateUserAdmin);

    //api register and login
    // router.post('/create-new-user',handleCreateNewUser);
    // router.post('/login',handleLogin);

    // //api CRUD users
    // router.get('/get-all-users', handleGetAllUsers);
    // router.put('/update-user', handleEditUser);
    // router.delete('/delete-user',handleDeleteUser);


    //api upload va chuyen anh thanh link
    router.post('/upload-image', uploadService.uploadImage(), handleUpLoadImage)


    //api CRUD product
    router.get('/get-all-product', handleGetAllProduct);
    router.get('/get-product-by-page', handleGetProductByPage);
    router.post('/create-new-product', uploadService.uploadImage(), handleCreateNewProduct);
    router.put('/update-product/:id', uploadService.uploadImage(), handleUpdateProduct);
    router.delete('/delete-product/:id', handleDeleteProduct);

    //api CRUD category
    router.get('/get-all-category', handleGetAllCategory);
    router.post('/create-new-category', handleCreateNewCategory);
    router.put('/update-category/:id', handleUpdateCategory);
    router.delete('/delete-category/:id', handleDeleteCategory);

    //api CRUD batch
    // router.get('/get-all-batch', handleGetAllBatch);
    // router.post('/create-new-batch', handleCreateNewBatch);
    // router.put('/update-batch/:id', handleUpdateBatch);
    // router.delete('/delete-batch/:id', handleDeleteBatch);

    return app.use("/api/", router);
}

export default initWebRoute;
