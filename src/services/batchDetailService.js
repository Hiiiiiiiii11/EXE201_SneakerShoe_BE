
import db from "../../db/models/index.js";


const GetBatchDetailByBatchDetailId = (batchDetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!batchDetailId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing batchDetailId'
                })
            } else {
                const batchDetail = await db.BatchDetail.findOne({
                    where: { BatchDetailId: batchDetailId },
                    include: [
                        {
                            model: db.Product,
                            as: 'product',
                        }
                    ]
                })
                if (batchDetail) {
                    return resolve({
                        errCode: 0,
                        errMessage: "OK",
                        batchDetail: batchDetail
                    })
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "batchDetail is't exist",
                    })
                }

            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const GetBatchDetailByBatchId = (batchId) => {
    console.error('check', batchId)
    return new Promise(async (resolve, reject) => {
        try {
            if (!batchId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing batchId"
                })
            } else {
                const batchDetail = await db.BatchDetail.findAll({
                    where: { BatchId: batchId },
                    include: [
                        {
                            model: db.Product,
                            as: 'product',
                        }
                    ]
                })
                if (batchDetail) {
                    return resolve({
                        errCode: 0,
                        errMessage: "OK",
                        batchDetail: batchDetail
                    })
                } else {
                    return resolve({
                        errCode: 0,
                        errMessage: "BatchDetail is't exist",
                    })
                }
            }

        } catch (e) {
            console.error(e);
            reject(e);
        }
    })

}
const CreateNewBatchDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.batchId || !data.productId || !data.quantity || !data.costPrice) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing required paramter"
                })
            } else {
                const newBatchDetail = await db.BatchDetail.create({
                    batchId: data.batchId,
                    productId: data.productId,
                    quantity: data.quantity,
                    costPrice: data.costPrice
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create batchDetail success",
                    batchDetail: newBatchDetail
                })
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const GetAllBatchDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await db.BatchDetail.findAll();
            resolve({
                errCode: 0,
                errMessage: "OK",
                batchDetail: response
            })
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })
}
const UpdateBatchDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.batchDetailId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing batchDetailId Id'
                })
            } else {
                const batchDetail = await db.BatchDetail.findOne({
                    where: { BatchDetailId: data.batchDetailId }
                })
                if (batchDetail) {
                    batchDetail.batchId = data.batchId,
                        batchDetail.productId = data.productId,
                        batchDetail.quantity = data.quantity,
                        batchDetail.costPrice = data.costPrice

                    let updateBatchDetail = await batchDetail.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Update batch detail success',
                        batchdetail: updateBatchDetail
                    });
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "BatchDetail is't exist",
                    });
                }
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const DeleteBatchDetail = (batchDetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!batchDetailId) {
                return resolve({
                    errCode: -1,
                    errMessage: "Missing batchDetailId"
                })
            } else {
                const batchDetail = await db.BatchDetail.findOne({
                    where: { BatchDetailId: batchDetailId }
                })
                if (batchDetail) {
                    await db.BatchDetail.destroy({
                        where: { BatchDetailId: batchDetailId }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Delete batchDetail success",
                    })
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "BatchDetail is't exist",
                    })
                }
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })

}
export default {
    GetBatchDetailByBatchDetailId, GetBatchDetailByBatchId,
    CreateNewBatchDetail, GetAllBatchDetail, UpdateBatchDetail, DeleteBatchDetail
}