import express from "express";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/userController.js";
let router = express.Router();



const initWebRoute = (app) => {
    //api CRUD roles
    router.get('/get-all-roles', handleGetAllRoles);

    router.post('/create-new-role', handleCreateNewRole);
    router.put('/update-role/:id', handleUpdateRole);
    router.delete('/delete-role/:id', handleDeleteRole);


    // //api register and login
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.post('/api/login', userController.handleLogin);

    // //api CRUD users
    // router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.put('/api/edit-user', userController.handleEditUser);
    // router.delete('/api/delete-user', userController.handleDeleteUser);
    return app.use("/api", router);
}

export default initWebRoute;
