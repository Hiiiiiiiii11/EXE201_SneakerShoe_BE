import productService from '../services/productService.js'

/**
 * @swagger
 * /api/get-all-product:
 *   get:
 *     summary: Lấy tất cả product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách các product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: OK
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       productName:
 *                         type: string
 *                         example: "Sneaker XYZ"
 *                       price:
 *                         type: number
 *                         example: 89.99
 *                       brandId:
 *                         type: integer
 *                         example: 2
 *                       productImage:
 *                         type: string
 *                         example: "https://cloudinary.com/image.jpg"
 *                        productDetailImg:
 *                         type: array          # <-- sửa thành array
 *                         items:
 *                            type: string
 */
export const handleGetAllProduct = async (req, res) => {
    try {
        const response = await productService.GetAllProduct();
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
        return res.status(500).json({ errCode: 1, errMessage: "Internal server error" });
    }
}


/**
 * @swagger
 * /api/get-product-by-id/{id}:
 *   get:
 *     summary: Lấy product bằng id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của product 
 *     responses:
 *       200:
 *         description: Lấy product bằng productId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: OK
 *                 product:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       productName:
 *                         type: string
 *                         nullable: true
 *                         example: "product"
 *                       price:
 *                         type: decimal
 *                         nullable: true
 *                         example: "10"
 *                       categoryName:
 *                         type: string
 *                         nullable: true
 *                         example: "Shoe"
 *                       productImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https:..."
 *                        productDetailImg:
 *                         type: array          # <-- sửa thành array
 *                         items:
 *                            type: string
 */
export const handleGetProductById = async (req, res) => {
    try {
        const productId = req.params.id
        const response = await productService.GetProductById(productId)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            errMessage: "Internal server error"
        });
    }
}

/**
 * @swagger
 * /api/get-product-by-page:
 *   get:
 *     summary: Lấy danh sách sản phẩm có phân trang và lọc theo category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: Số lượng sản phẩm mỗi trang
 *       - in: query
 *         name: CategoryId
 *         schema:
 *           type: integer
 *           example: "1"
 *         required: false
 *         description: Tên danh mục sản phẩm
 *     responses:
 *       200:
 *         description: Danh sách các sản phẩm
 */
export const handleGetProductByPage = async (req, res) => {
    try {
        const { page, limit, CategoryId } = req.query;
        console.error('check', req.query)
        const response = await productService.GetProductByPage(page, limit, CategoryId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ errCode: 1, errMessage: "Internal server error" });
    }
};


/**
 * @swagger
 * /api/create-new-product:
 *   post:
 *     summary: Tạo sản phẩm mới với ảnh upload
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - categoryId
 *               - brandId
 *               - productImage
 *               - productDetailImg
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *               productImage:
 *                 type: string
 *                 format: binary
 *               productDetailImg:
 *                 type: array          # <-- sửa thành array
 *                 items:
 *                    type: string
 *                    format: binary
 *     responses:
 *       200:
 *         description: Tạo sản phẩm thành công
 */
export const handleCreateNewProduct = async (req, res) => {
    try {
        const files = req.files; // multer xử lý nhiều file

        // Kiểm tra bắt buộc productImage phải có
        if (!files || !files.productImage || files.productImage.length === 0) {
            return res.status(400).json({ errCode: 1, errMessage: 'Missing productImage file' });
        }

        // Gán đường dẫn file productImage (1 file)
        req.body.productImage = files.productImage[0].path;

        // Gán đường dẫn file productDetailImg (nhiều file)
        if (files.productDetailImg && files.productDetailImg.length > 0) {
            // Lấy tất cả đường dẫn của các file productDetailImg thành mảng
            req.body.productDetailImg = files.productDetailImg.map(file => file.path);
        }

        const response = await productService.CreateNewProduct(req.body);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
    }
}



/**
 * @swagger
 * /api/update-product/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm theo ID (có thể kèm ảnh mới)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *               productImage:
 *                 type: string
 *                 format: binary
 *               productDetailImg:
 *                 type: array          # <-- sửa thành array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: Update product success
 *                 product:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     productName:
 *                       type: string
 *                       example: "Giày mới"
 *                     description:
 *                       type: string
 *                       example: "Giày thể thao cao cấp"
 *                     price:
 *                       type: number
 *                       example: 120.99
 *                     categoryId:
 *                       type: integer
 *                       example: 2
 *                     brandId:
 *                       type: integer
 *                       example: 1
 *                     productImage:
 *                       type: string
 *                       example: "https://res.cloudinary.com/...jpg"
 *                     productDetailImg:
 *                       type: array          # <-- sửa thành array
 *                       items:
 *                         type: string
 *                         format: binary
 */
export const handleUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const files = req.files;
        const data = req.body;

        if (!productId) {
            return res.status(400).json({ errCode: 1, message: "Missing required parameter!" });
        }

        data.productId = productId;

        // Nếu có upload productImage mới thì cập nhật
        if (files && files.productImage && files.productImage.length > 0) {
            data.productImage = files.productImage[0].path;
        }

        if (files && files.productDetailImg && files.productDetailImg.length > 0) {
            data.productDetailImg = files.productDetailImg.map(file => file.path);
        }

        const response = await productService.UpdateProduct(data);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ errCode: -1, errMessage: 'Internal server error' });
    }
}


/**
 * @swagger
 * /api/delete-product/{id}:
 *   delete:
 *     summary: Xóa product theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của product cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 */
export const handleDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({ errCode: 1, message: "Missing required parameter!" });
        }
        const response = await productService.DeleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
        return res.status(500).json({ errCode: -1, errMessage: 'Internal server error' })
    }
}

