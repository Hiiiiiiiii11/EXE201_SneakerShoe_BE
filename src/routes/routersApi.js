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
import { handleCreateNewBatchDetail, handleDeleteBatchDetail, handleGetAllBatchDetail, handleGetBatchDetailByBatchDetailId, handleGetBatchDetailByBatchId, handleUpdateBatchDetail } from "../controllers/batchDetailController.js";
import { createPromotion, getAllPromotions, getPromotionById, updatePromotion, deletePromotion } from "../controllers/promotionController.js";
import { handleAddNewProductToCart, handleDeleteAllProductFromCart, handleDeleteProductFromCart, handleGetCartByUserId, handleUpdateProductQuantityCart } from "../controllers/cartController.js";
import { createReview, getAllReviews, updateReview, deleteReview, getReviewsByProductId, getReviewsByUserId } from "../controllers/reviewsController.js";
import { createSize, getAllSizes, getSizeById, updateSize, deleteSize } from "../controllers/sizeController.js";
import { handlePayOSWebhook } from "../controllers/paymentController.js";
import { handleCreateNewOrder, handleGetALLOrder, handleGetOrderByUserId } from "../controllers/orderController.js";
let router = express.Router();

const initWebRoute = (app) => {


    app.get('/', (req, res) => {
        res.send('Welcome to Sneaker Shoe API backend');
    });

    //api upload va chuyen anh thanh link
    router.post('/upload-image', uploadService.uploadImage(), handleUpLoadImage);

    //api CRUD roles
    router.get('/get-all-roles', verifyToken, handleGetAllRoles);
    router.post('/create-new-role', verifyToken, handleCreateNewRole);
    router.put('/update-role/:id', verifyToken, handleUpdateRole);
    router.delete('/delete-role/:id', verifyToken, handleDeleteRole);

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






    //api CRUD product
    router.get('/get-all-product', handleGetAllProduct);
    router.get('/get-product-by-page', handleGetProductByPage);
    router.get('/get-product-by-id/:id', handleGetProductById);
    router.post('/create-new-product', uploadService.uploadImage(), verifyToken, handleCreateNewProduct);
    router.put('/update-product/:id', uploadService.uploadImage(), verifyToken, handleUpdateProduct);
    router.delete('/delete-product/:id', verifyToken, handleDeleteProduct);

    //api CRUD category
    router.get('/get-all-category', verifyToken, handleGetAllCategory);
    router.get('/get-category-by-id/:id', verifyToken, handleGetCategoryById);
    router.post('/create-new-category', verifyToken, handleCreateNewCategory);
    router.put('/update-category/:id', verifyToken, handleUpdateCategory);
    router.delete('/delete-category/:id', verifyToken, handleDeleteCategory);

    //api CRUD batch
    router.get('/get-all-batch', verifyToken, handleGetAllBatch);
    router.get('/get-batch-by-id/:id', verifyToken, handleGetBatchById);
    router.post('/create-new-batch', verifyToken, handleCreateNewBatch);
    router.put('/update-batch/:id', verifyToken, handleUpdateBatch);
    router.delete('/delete-batch/:id', verifyToken, handleDeleteBatch);

    //api CRUD batchDetail
    router.get('/get-all-batchdetail', verifyToken, handleGetAllBatchDetail);
    router.get('/get-batchdetail-by-batchdetailid/:id', verifyToken, handleGetBatchDetailByBatchDetailId);
    router.get('/get-batchdetail-by-batchid/:id', verifyToken, handleGetBatchDetailByBatchId);
    router.post('/create-new-batchdetail', verifyToken, handleCreateNewBatchDetail);
    router.put('/update-batchdetail/:id', verifyToken, handleUpdateBatchDetail);
    router.delete('/delete-batchdetail/:id', verifyToken, handleDeleteBatchDetail);

    //api CRUD Cart
    router.get('/get-cart-by-userid/:id', verifyToken, handleGetCartByUserId);
    router.post('/add-new-product-to-cart', verifyToken, handleAddNewProductToCart);
    router.put('/update-product-quantity-cart/:id', verifyToken, handleUpdateProductQuantityCart);
    router.delete('/delete-a-product-from-cart/:id', verifyToken, handleDeleteProductFromCart);
    router.delete('/delete-all-product-from-cart/:id', verifyToken, handleDeleteAllProductFromCart);

    // API CRUD Promotions
    router.post("/create-promotion", createPromotion);
    router.get("/get-all-promotions", getAllPromotions);
    router.get("/get-promotion/:id", getPromotionById);
    router.put("/update-promotion/:id", updatePromotion);
    router.delete("/delete-promotion/:id", deletePromotion);

    // API CRUD Reviews
    router.post("/create-review", createReview);
    router.get("/get-all-reviews", getAllReviews);
    router.put("/update-review/:id", updateReview);
    router.delete("/delete-review/:id", deleteReview);
    router.get("/reviews/user/:userId", getReviewsByUserId);
    router.get("/reviews/product/:productId", getReviewsByProductId);

    //API CRUD Size
    router.post("/create-size", createSize);
    router.get("/get-all-sizes", getAllSizes);
    router.get("/get-size/:id", getSizeById);
    router.put("/update-size/:id", updateSize);
    router.delete("/delete-size/:id", deleteSize);

    //api CRUD Orders
    router.get('/get-all-order', handleGetALLOrder);
    router.post('/create-new-order/:id/promotion/:promotionId', handleCreateNewOrder);
    router.get('/get-order-by-user-id/:id', handleGetOrderByUserId);
    // router.delete('/delete-size/:id', handleDeleteSize);


    //status thanh toán 
    router.post("/payos/payment", handlePayOSWebhook);

    return app.use("/api/", router);
}

export default initWebRoute;
