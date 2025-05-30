import { where } from "sequelize";
import db from "../../db/models/index.js";

const GetAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findAll({
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                        attributes: ['categoryName'] // Chỉ lấy tên category
                    }
                ]
            });
            resolve(product)

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}


const GetProductByPage = (page = 1, limit = 10, categoryName = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;

            // Tạo điều kiện lọc nếu có categoryName
            const includeQuery = {
                model: db.Category,
                as: 'category',
                attributes: ['categoryName'],
                ...(categoryName && {
                    where: { categoryName: categoryName }
                })
            };

            const products = await db.Product.findAndCountAll({
                include: [includeQuery],
                limit: +limit,
                offset: +offset,
                distinct: true, // Đảm bảo count chính xác khi join
                order: [['ProductId', 'ASC']]
            });

            resolve({
                errCode: 0,
                errMessage: 'OK',
                totalItems: products.count,
                totalPages: Math.ceil(products.count / limit),
                currentPage: +page,
                products: products.rows
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};
const CreateNewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.productName || !data.price || !data.categoryId || !data.productImage) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            let newProduct = await db.Product.create({
                productName: data.productName,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId,
                productImage: data.productImage,
                Stock: data.Stock
            });
            resolve({
                errCode: 0,
                errMessage: "Ok",
                product: newProduct // Trả về thông tin role vừa tạo
            });

        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}


const DeleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { productId: productId }
            })
            if (!product) {
                resolve({
                    errCode: 1,
                    errMessage: "The product is't exist"
                })
            } else {
                await db.Product.destroy({
                    where: { productId: productId }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Delete product success'
                })
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}




export default {
    GetAllProduct, GetProductByPage, CreateNewProduct, DeleteProduct
}