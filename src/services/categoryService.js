
import db from "../../db/models/index.js";

const GetAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Category.findAll();
            resolve(roles)
        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
};
const CreateNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.categoryName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let newCategory = await db.Category.create({
                categoryName: data.categoryName,
                description: data.description
            });
            resolve({
                errCode: 0,
                errMessage: "Create category success",
                category: newCategory
            })

        } catch (e) {
            console.error("Error creating category", e);
            reject(e)
        }
    })

}

const UpdateCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.CategoryId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let category = await db.Category.findOne({
                where: { CategoryId: data.CategoryId }
            });
            if (category) {
                category.categoryName = data.categoryName;
                category.description = data.description;

                let updateCategory = await category.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update category success',
                    category: updateCategory
                });
                resolve({
                    errCode: 0,
                    errMessage: "Create category success",
                    category: category
                })
            }
        } catch (e) {
            console.error("Error update category", e);
            reject(e)
        }
    })
}

const DeleteACategory = (categoryId) => {
    console.error('check category deleyte ', categoryId)
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: { categoryId: categoryId }
            })
            if (!category) {
                resolve({
                    errCode: 2,
                    message: `The category isn't exist!`
                })
            } else {
                await db.Category.destroy({
                    where: { categoryId: categoryId }
                })
                resolve({
                    errCode: 0,
                    message: `The category is deleted!`
                })
            }



        } catch (e) {
            console.error(e)
            reject(e);
        }

    })
}




export default {
    GetAllCategory, CreateNewCategory, UpdateCategory, DeleteACategory
}