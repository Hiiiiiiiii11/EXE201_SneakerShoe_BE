import brandService from "../services/brandsService.js";

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Quản lý thương hiệu sản phẩm
 */

/**
 * @swagger
 * /api/get-all-brands:
 *   get:
 *     summary: Lấy danh sách tất cả brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Danh sách brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
export const getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({
      errCode: -1,
      errMessage: 'Internal server error'
    })
  }
};

/**
 * @swagger
 * /api/get-brand-by-id/{id}:
 *   get:
 *     summary: Lấy brand theo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của brand
 *     responses:
 *       200:
 *         description: Brand được tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Không tìm thấy brand
 */
export const getBrandById = async (req, res) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({
      errCode: -1,
      errMessage: 'Internal server error'
    })
  }
};

/**
 * @swagger
 * /api/create-new-brand:
 *   post:
 *     summary: Tạo mới một brand (có upload hình ảnh)
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - brandName
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Adidas
 *               description:
 *                 type: string
 *                 example: Thương hiệu thể thao của Đức
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand đã được tạo
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
export const createBrand = async (req, res) => {
  try {
    const data = req.body;
    const brandLogo = req.files?.brandLogo?.[0]?.path || null; // ✅ Cloudinary file path
    console.log('check brand', brandLogo)

    const newBrand = await brandService.createBrand(data, brandLogo);
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(500).json({
      errCode: -1,
      errMessage: 'Internal server error'
    })
  }
};

/**
 * @swagger
 * /api/update-brand/{id}:
 *   put:
 *     summary: Cập nhật brand (có thể cập nhật ảnh)
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của brand cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: Nike Sportswear
 *               description:
 *                 type: string
 *                 example: Dòng sản phẩm mới của Nike
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Không tìm thấy brand
 */
export const updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id
    const data = req.body;
    const brandLogo = req.files?.brandLogo?.[0]?.path || null;

    const updated = await brandService.updateBrand(brandId, data, brandLogo);

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      errCode: -1,
      errMessage: 'Internal server error'
    })
  }
};

/**
 * @swagger
 * /api/delete-brand/{id}:
 *   delete:
 *     summary: Xoá brand theo ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của brand cần xoá
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy brand
 */
export const deleteBrand = async (req, res) => {
  try {
    const result = await brandService.deleteBrand(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errCode: -1,
      errMessage: 'Internal server error'
    })
  }
};
