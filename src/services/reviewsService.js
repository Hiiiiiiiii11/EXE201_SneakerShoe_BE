import db from "../../db/models/index.js";

const createReview = async (data) => {
  try {
    const newReview = await db.Review.create(data);
    return { errCode: 0, errMessage: "Review created", review: newReview };
  } catch (e) {
    console.error("🔥 createReview error:", e);
    throw e;
  }
};

const getAllReviews = async () => {
  const reviews = await db.Review.findAll({
    include: [
      { model: db.User, as: "user", attributes: ["userId", "firstName", "lastName"] },
      { model: db.OrderDetail, as: "orderDetail" }
    ]
  });
  return { errCode: 0, reviews };
};

const updateReview = async (id, data) => {
  const review = await db.Review.findByPk(id);
  if (!review) return { errCode: 1, errMessage: "Review not found" };
  await review.update(data);
  return { errCode: 0, errMessage: "Updated", review };
};

const deleteReview = async (id) => {
  const review = await db.Review.findByPk(id);
  if (!review) return { errCode: 1, errMessage: "Review not found" };
  await review.destroy();
  return { errCode: 0, errMessage: "Deleted" };
};

const getReviewsByProductId = async (productId) => {
  const reviews = await db.Review.findAll({
    include: [
      {
        model: db.OrderDetail,
        as: "orderDetail",
        where: { productId },
        required: true
      },
      {
        model: db.User,
        as: "user",
        attributes: ["userId", "firstName", "lastName"]
      }
    ]
  });
  return { errCode: 0, reviews };
};

const getReviewsByUserId = async (userId) => {
  const reviews = await db.Review.findAll({
    where: { userId },
    include: [
      {
        model: db.OrderDetail,
        as: "orderDetail",
        include: [{ model: db.Product, as: "product" }]
      }
    ]
  });
  return { errCode: 0, reviews };
};

export default {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewsByProductId,
  getReviewsByUserId
};
