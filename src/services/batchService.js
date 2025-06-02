import { where } from "sequelize";
import db from "../../db/models/index.js";

const GetAllBatch = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Batch.findAll();
            resolve({
                errCode: 0,
                errMessage: 'OK',
                batch: response
            })

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const CreateNewBatch = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrivalDate || !data.totalCost) {
                return resolve({
                    errCode: -1,
                    errCode: "Missing required parameter"
                })
            }
            const newBatch = await db.Batch.create({
                arrivalDate: data.arrivalDate,
                totalCost: data.totalCost,
            })
            resolve({
                errCode: 0,
                errMessage: 'Create new batch success',
                batch: newBatch
            })


        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const GetBatchById = (batchId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!batchId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing batchId'
                })
            } else {
                const response = await db.Batch.findOne({
                    where: { BatchId: batchId }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    batch: response
                })
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })

}
const DeleteBatch = (batchId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!batchId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing batchId'
                })
            } else {
                const batch = await db.Batch.findOne({
                    where: { BatchId: batchId }
                })
                if (!batch) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Batch is't exist"
                    })
                } else {
                    await db.Batch.destroy({
                        where: { BatchId: batchId }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Delete batch success",
                })
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const UpdateBatch = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.batchId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing batch Id'
                })
            } else {
                const batch = await db.Batch.findOne({
                    where: { BatchId: data.batchId }
                })
                console.error('check', batch)
                if (batch) {
                    batch.arrivalDate = data.arrivalDate;
                    batch.totalCost = data.totalCost;

                    let updateBatch = await batch.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Update batch success',
                        batch: updateBatch
                    });
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "Batch is't exist",
                    });
                }

            }
        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

export default {
    GetAllBatch, CreateNewBatch, GetBatchById, DeleteBatch, UpdateBatch
};