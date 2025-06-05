import db from "../../db/models/index.js";

const getAllSizes = async () => {
  const sizes = await db.Size.findAll();
  return {
    errCode: 0,
    errMessage: "OK",
    sizes
  };
};

const getSizeById = async (id) => {
  const size = await db.Size.findByPk(id);
  if (!size) {
    return { errCode: 1, errMessage: "Size not found" };
  }
  return { errCode: 0, errMessage: "OK", size };
};

const createSize = async (data) => {
  const newSize = await db.Size.create(data);
  return { errCode: 0, errMessage: "Size created", size: newSize };
};

const updateSize = async (id, data) => {
  const size = await db.Size.findByPk(id);
  if (!size) {
    return { errCode: 1, errMessage: "Size not found" };
  }
  await size.update(data);
  return { errCode: 0, errMessage: "Size updated", size };
};

const deleteSize = async (id) => {
  const size = await db.Size.findByPk(id);
  if (!size) {
    return { errCode: 1, errMessage: "Size not found" };
  }
  await size.destroy();
  return { errCode: 0, errMessage: "Size deleted" };
};

export default {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize
};
