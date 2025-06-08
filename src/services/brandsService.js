import { where } from "sequelize";
import db from "../../db/models/index.js";

const getAllBrands = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brands = await db.Brand.findAll();
      return resolve({
        errCode: 0,
        errMessage: 'OK',
        brands: brands
      });
    } catch (e) {
      console.error(e);
      reject(e)
    }
  })

};

const getBrandById = async (id) => {
  const brand = await db.Brand.findByPk(id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return brand;
};

const createBrand = (data, brandLogo) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.brandName) {
        return resolve({
          errCode: 1,
          errMessage: 'Brand Name can not be null'
        });
      }

      // Kiểm tra xem brandName đã tồn tại chưa 
      const existing = await db.Brand.findOne({
        where: db.Sequelize.where(
          db.Sequelize.fn("lower", db.Sequelize.col("brandName")),
          data.brandName.toLowerCase()
        )
      });

      if (existing) {
        return resolve({
          errCode: 1,
          errMessage: "Brand Name already exist"
        })
      }

      const brand = await db.Brand.create({
        brandName: data.brandName,
        brandLogo: brandLogo,
        description: data.description
      });

      return resolve({
        errCode: 0,
        errMessage: "Create brand success",
        brand: brand
      });
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}



const updateBrand = (brandId, data, brandLogo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findByPk(brandId);
      if (!brand) {
        return resolve({
          errCode: 1,
          errMessage: "Brand isn't exist"
        })
      }
      // Kiểm tra xem brandName đã tồn tại chưa 
      const existing = await db.Brand.findOne({
        where: db.Sequelize.where(
          db.Sequelize.fn("lower", db.Sequelize.col("brandName")),
          data.brandName.toLowerCase()
        )
      });

      if (existing) {
        return resolve({
          errCode: 1,
          errMessage: "Brand Name already exist"
        })
      }
      // Chỉ cập nhật brandLogo nếu có
      const updateData = {
        brandName: data.brandName ?? brand.brandName,
        description: data.description ?? brand.description
      };

      if (brandLogo) {
        updateData.brandLogo = brandLogo;
      }

      const updateBrand = await brand.update(updateData);
      return resolve({
        errCode: 0,
        errMessage: "Update brand success",
        brand: updateBrand
      });
    } catch (e) {
      console.error(e);
      reject(e)
    }
  })

};

const deleteBrand = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.Brand.findByPk(id);
      if (!brand) {
        return resolve({
          errCode: 1,
          errMessage: "Brand isn't exist"
        })
      }
      await brand.destroy();
      return resolve({
        errCode: 0,
        errMessage: "Delete brand success"
      })
    } catch (e) {
      console.error(e);
      reject(e)
    }
  })

};


export default {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,

};