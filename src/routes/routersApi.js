import express from "express";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/userController.js";
let router = express.Router();



const initWebRoute = (app) => {
    //api CRUD roles
    /**
    * @swagger
    * /api/get-all-roles:
    *   get:
    *     summary: Lấy tất cả vai trò
    *     tags:
    *       - Roles
    *     responses:
    *       200:
    *         description: Thành công
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 errCode:
    *                   type: integer
    *                 errMessage:
    *                   type: string
    *                 roles:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       roleId:
    *                         type: integer
    *                       userId:
    *                         type: integer
    *                         nullable: true
    *                       code:
    *                         type: string
    *                         nullable: true
    *                       description:
    *                         type: string
    *                         nullable: true
    *             example:
    *               errCode: 0
    *               errMessage: "OK"
    *               roles:
    *                 - roleId: 1
    *                   userId: 1
    *                   code: "CUSTOMER"
    *                   description: "Khách hàng thường"
    *                 - roleId: 2
    *                   userId: 2
    *                   code: "STAFF"
    *                   description: "Nhân viên bán hàng"
    */


    router.get('/api/get-all-roles', handleGetAllRoles);
    router.post('/api/create-new-role', handleCreateNewRole);
    router.put('/api/update-role/:id', handleUpdateRole);
    router.delete('/api/delete-role/:id', handleDeleteRole);


    // //api register and login
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.post('/api/login', userController.handleLogin);

    // //api CRUD users
    // router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.put('/api/edit-user', userController.handleEditUser);
    // router.delete('/api/delete-user', userController.handleDeleteUser);
    return app.use("/", router);
}

export default initWebRoute;
