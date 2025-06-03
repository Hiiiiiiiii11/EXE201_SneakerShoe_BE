import express from "express";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { handleGoogleLogin, handleLogin } from "../controllers/authController.js";
import { createUserBySelf, createUserByAdmin, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { handleGetAllRoles, handleCreateNewRole, handleDeleteRole, handleUpdateRole } from "../controllers/roleController.js";
import { handleCreateNewCategory, handleDeleteCategory, handleGetAllCategory, handleGetCategoryById, handleUpdateCategory } from "../controllers/categoryController.js";
import { handleUpLoadImage } from "../controllers/uploadController.js";
import uploadService from "../services/uploadService.js";
import { handleCreateNewProduct, handleDeleteProduct, handleGetAllProduct, handleGetProductById, handleGetProductByPage, handleUpdateProduct } from "../controllers/productController.js";
import { handleCreateNewBatch, handleDeleteBatch, handleGetAllBatch, handleGetBatchById, handleUpdateBatch } from "../controllers/batchController.js";
import { handleGetBatchDetailByBatchDetailId, handleGetBatchDetailByBatchId } from "../controllers/batchDetailController.js";
import { createPromotion, getAllPromotions, getPromotionById, updatePromotion, deletePromotion } from "../controllers/promotionController.js";
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

    // 📌 Auth routes
    router.post("/login", handleLogin);
    router.post("/google-login", handleGoogleLogin);

    //User
    router.post("/customer/create-user", createUserBySelf);
    // Admin create user
    router.post("/admin/create-user", verifyToken, isAdmin, createUserByAdmin);
    //api CRUD users
    //khi FE gọi api này thì cần phải truyền token vào header để xác thực người dùng
        // nếu không có token hoặc token không hợp lệ thì sẽ trả về lỗi 401 Unauthorized
        // Authorization: `Bearer ${token}`
    router.get("/get-all-users", verifyToken, isAdmin, getAllUsers);
    router.get("/get-user-detail/:id", verifyToken, getUserById);
    router.put("/update-user/:id", uploadService.uploadImage(), verifyToken, updateUser);
    router.delete("/delete-user/:id", verifyToken, deleteUser);

    

    //api upload va chuyen anh thanh link
    router.post('/upload-image', uploadService.uploadImage(), handleUpLoadImage)


    //api CRUD product
    router.get('/get-all-product', handleGetAllProduct);
    router.get('/get-product-by-page', handleGetProductByPage);
    router.get('/get-product-by-id/:id', handleGetProductById);
    router.post('/create-new-product', uploadService.uploadImage(), handleCreateNewProduct);
    router.put('/update-product/:id', uploadService.uploadImage(), handleUpdateProduct);
    router.delete('/delete-product/:id', handleDeleteProduct);

    //api CRUD category
    router.get('/get-all-category', handleGetAllCategory);
    router.get('/get-category-by-id/:id', handleGetCategoryById);
    router.post('/create-new-category', handleCreateNewCategory);
    router.put('/update-category/:id', handleUpdateCategory);
    router.delete('/delete-category/:id', handleDeleteCategory);

    //api CRUD batch
    router.get('/get-all-batch', handleGetAllBatch);
    router.get('/get-batch-by-id/:id', handleGetBatchById);
    router.post('/create-new-batch', handleCreateNewBatch);
    router.put('/update-batch/:id', handleUpdateBatch);
    router.delete('/delete-batch/:id', handleDeleteBatch);

    //api CRUD batchDetail
    router.get('/get-batchdetail-by-batchdetailid/:id', handleGetBatchDetailByBatchDetailId);
    router.get('/get-batchdetail-by-batchid/:id', handleGetBatchDetailByBatchId);
    // router.post('/create-new-batch', handleCreateNewBatch);
    // router.put('/update-batch/:id', handleUpdateBatch);
    // router.delete('/delete-batch/:id', handleDeleteBatch);

    // API CRUD Promotions
    router.post("/create-promotion", createPromotion);
    router.get("/get-all-promotions", getAllPromotions);
    router.get("/get-promotion/:id", getPromotionById);
    router.put("/update-promotion/:id", updatePromotion);
    router.delete("/delete-promotion/:id", deletePromotion);

    return app.use("/api/", router);
}

export default initWebRoute;
