
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
                    where: { BatchDetailId: batchDetailId }
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
export default {
    GetBatchDetailByBatchDetailId, GetBatchDetailByBatchId
}