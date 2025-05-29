import express from "express";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/userController.js";
let router = express.Router();



const initWebRoute = (app) => {
    //api CRUD roles
    router.get('/get-all-roles', handleGetAllRoles);
    router.post('/create-new-role', handleCreateNewRole);
    router.put('/update-role/:id', handleUpdateRole);
    router.delete('/delete-role/:id', handleDeleteRole);

    //api create user for admin role
    // router.post('/api/admin/create-user',handleCreateUserAdmin);

    //api register and login
    // router.post('/api/create-new-user',handleCreateNewUser);
    // router.post('/api/login',handleLogin);

    // //api CRUD users
    // router.get('/api/get-all-users', handleGetAllUsers);
    // router.put('/api/edit-user', handleEditUser);
    // router.delete('/api/delete-user',handleDeleteUser);

    //api CRUD product
    // router.get('/api/get-all-product', handleGetAllProduct);
    // router.post('/api/create-new-product', handleCreateNewProduct);
    // router.put('/api/edit-product',handleEditProduct);
    // router.delete('/api/delete-product',handleDeleteProduct);

    //api CRUD category
    // router.get('/api/get-all-category', handleGetAllCategory);
    // router.post('/api/create-new-category', handleCreateNewCategory);
    // router.put('/api/edit-category',handleEditCategory);
    // router.delete('/api/delete-category',handleDeleteCategory);

    return app.use("/api", router);
}

export default initWebRoute;
