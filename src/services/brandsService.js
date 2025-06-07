import db from "../../db/models/index.js";

const getAllBrands = async () => {
  const brands = await db.Brand.findAll();
  if (!brands || brands.length === 0) {
    throw new Error('No brands found');
  }
  return brands;
};

const getBrandById = async (id) => {
  const brand = await db.Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return brand;
};

const createBrand = async (data) => {
  const { brandName, brandLogo = null, description = null } = data;

  if (!brandName || brandName.trim() === "") {
    throw new Error("brandName là bắt buộc");
  }

  // Kiểm tra xem brandName đã tồn tại chưa 
  const existing = await db.Brand.findOne({
    where: db.Sequelize.where(
      db.Sequelize.fn("lower", db.Sequelize.col("brandName")),
      brandName.toLowerCase()
    )
  });

  if (existing) {
    throw new Error("Tên thương hiệu đã tồn tại");
  }

  const brand = await db.Brand.create({
    brandName,
    brandLogo,
    description
  });

  return brand;
};

const updateBrand = async (id, data) => {
  const brand = await db.Brand.findByPk(id);
  if (!brand) {
    throw new Error("Không tìm thấy thương hiệu.");
  }

  // Chỉ cập nhật brandLogo nếu có
  const updateData = {
    brandName: data.brandName ?? brand.brandName,
    description: data.description ?? brand.description
  };

  if (data.brandLogo !== undefined) {
    updateData.brandLogo = data.brandLogo;
  }

  await brand.update(updateData);
  return brand;
};

const deleteBrand = async (id) => {
  const brand = await db.Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  await brand.destroy();
  return { message: 'Brand deleted' };
};

export default {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};