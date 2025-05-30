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
 *                 roles:
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
 *                         example: "CUSTOMER"
 *                       price:
 *                         type: decimal
 *                         nullable: true
 *                         example: "$10"
 *                       categoryName:
 *                         type: string
 *                         nullable: true
 *                         example: "Shoe"
 *                       productImgae:
 *                         type: string
 *                         nullable: true
 *                         example: "https:..."
 *                       Stock:
 *                         type: interger
 *                         nullable: true
 *                         example: "10"
 */

export const handleGetAllProduct = async (req, res) => {
    try {
        const response = await productService.GetAllProduct();
        return res.status(200).json(response)

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            errMessage: "Internal server error"
        })
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
 *         name: categoryName
 *         schema:
 *           type: string
 *           example: "Shoe"
 *         required: false
 *         description: Tên danh mục sản phẩm
 *     responses:
 *       200:
 *         description: Danh sách các sản phẩm
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
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
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
 *                         nullable: true
 *                         example: "Giày Nike"
 *                       price:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         example: 99.99
 *                       category:
 *                         type: object
 *                         properties:
 *                           categoryName:
 *                             type: string
 *                             example: "Shoe"
 *                       productImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://cloudinary.com/image.jpg"
 *                       stock:
 *                         type: integer
 *                         nullable: true
 *                         example: 10
 */

export const handleGetProductByPage = async (req, res) => {
    try {
        const { page, limit, categoryName } = req.query;

        const response = await productService.GetProductByPage(page, limit, categoryName);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: 1,
            errMessage: "Internal server error"
        });
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
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tạo sản phẩm thành công
 */

export const handleCreateNewProduct = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing image file'
            });
        }
        req.body.productImage = file.path;
        const response = await productService.CreateNewProduct(req.body);
        return res.status(200).json(response) // Sửa lại cách trả dữ liệu);

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        })
    }
}


/**
 * @swagger
 * /api/delete-product/{id}:
 *   delete:
 *     summary: Xóa vai trò theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của vai trò cần xóa
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
 *       400:
 *         description: Thiếu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: Missing required parameter!
 *       500:
 *         description: Lỗi server
 */
export const handleDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!"
            });
        }
        const response = await productService.DeleteProduct(productId)
        return res.status(200).json(response)

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal server error'
        })
    }


}