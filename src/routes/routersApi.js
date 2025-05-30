import express from "express";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/roleController.js";
import { handleCreateNewCategory, handleDeleteCategory, handleGetAllCategory, handleUpdateCategory } from "../controllers/categoryController.js";
let router = express.Router();



const initWebRoute = (app) => {
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

    //api CRUD product
    // router.get('/get-all-product', handleGetAllProduct);
    // router.post('/create-new-product', handleCreateNewProduct);
    // router.put('/update-product',handleEditProduct);
    // router.delete('/delete-product',handleDeleteProduct);

    //api CRUD category
    router.get('/get-all-category', handleGetAllCategory);
    router.post('/create-new-category', handleCreateNewCategory);
    router.put('/update-category/:id', handleUpdateCategory);
    router.delete('/delete-category/:id', handleDeleteCategory);

    return app.use("/api", router);
}

export default initWebRoute;
