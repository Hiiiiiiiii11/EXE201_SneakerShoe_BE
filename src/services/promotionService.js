import db from "../../db/models/index.js";

const createPromotion = async (data) => {
  try {
    // Kiểm tra sơ bộ
    const requiredFields = ["promotionName", "description", "discountPercent", "startDate", "endDate", "minimumAmount"];
    for (let field of requiredFields) {
      if (!data[field]) {
        return {
          errCode: 2,
          errMessage: `${field} is required`
        };
      }
    }

    // (tuỳ chọn) Kiểm tra logic ví dụ startDate < endDate
    if (new Date(data.startDate) > new Date(data.endDate)) {
      return {
        errCode: 3,
        errMessage: "startDate must be before endDate"
      };
    }

    const newPromotion = await db.Promotion.create({
        promotionName: data.promotionName,
        description: data.description,
        discountPercent: data.discountPercent,
        startDate: data.startDate,
        endDate: data.endDate,
        minimumAmount: data.minimumAmount
    });


    return {
      errCode: 0,
      errMessage: "Promotion created successfully",
      promotion: newPromotion
    };
  } catch (e) {
    console.error("Error creating promotion:", e);
    throw e;
  }
};

const getAllPromotions = async () => {
  try {
    const promotions = await db.Promotion.findAll();
    return {
      errCode: 0,
      errMessage: "OK",
      promotions
    };
  } catch (e) {
    console.error("Error fetching promotions:", e);
    throw e;
  }
};

const getPromotionById = async (id) => {
  try {
    const promotion = await db.Promotion.findByPk(id);
    if (!promotion) {
      return {
        errCode: 1,
        errMessage: "Promotion not found"
      };
    }
    return {
      errCode: 0,
      errMessage: "OK",
      promotion
    };
  } catch (e) {
    console.error("Error fetching promotion:", e);
    throw e;
  }
};

const updatePromotion = async (id, data) => {
  try {
    const promotion = await db.Promotion.findByPk(id);
    if (!promotion) {
      return {
        errCode: 1,
        errMessage: "Promotion not found"
      };
    }

    // (tuỳ chọn) Validate logic giống create
    if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
      return {
        errCode: 3,
        errMessage: "startDate must be before endDate"
      };
    }

    await promotion.update({
        promotionName: data.promotionName,
        description: data.description,
        discountPercent: data.discountPercent,
        startDate: data.startDate,
        endDate: data.endDate,
        minimumAmount: data.minimumAmount
    });


    return {
      errCode: 0,
      errMessage: "Promotion updated successfully",
      promotion
    };
  } catch (e) {
    console.error("Error updating promotion:", e);
    throw e;
  }
};

const deletePromotion = async (id) => {
  try {
    const promotion = await db.Promotion.findByPk(id);
    if (!promotion) {
      return {
        errCode: 1,
        errMessage: "Promotion not found"
      };
    }

    await promotion.destroy();
    return {
      errCode: 0,
      errMessage: "Promotion deleted successfully"
    };
  } catch (e) {
    console.error("Error deleting promotion:", e);
    throw e;
  }
};

export default {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion
};
