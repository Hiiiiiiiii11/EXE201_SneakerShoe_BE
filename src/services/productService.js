import db from "../../db/models/index.js";

const GetAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await db.Product.findAll({
                attributes: ['productId', 'productName', 'price', 'productImage', 'productDetailImg'],
                include: [{
                    model: db.Category,
                    as: 'category',
                    attributes: ['CategoryId', 'categoryName'],
                },
                {
                    model: db.Brand,
                    as: 'brand',
                    attributes: ['brandId', 'brandName'],
                }
                ],

            });
            resolve({
                errCode: 0,
                errMessage: 'OK',
                product: product
            });

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const GetProductByPage = (page = 1, limit = 10, CategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = (page - 1) * limit;
            const whereCondition = CategoryId ? { categoryId: CategoryId } : {};

            const products = await db.Product.findAndCountAll({
                where: whereCondition,
                limit: +limit,
                offset: +offset,
                distinct: true,
                order: [['ProductId', 'ASC']],
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                        attributes: ['CategoryId', 'categoryName']
                    }, {
                        model: db.Brand,
                        as: 'brand',
                        attributes: ['brandId', 'brandName'],
                    }
                ],
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
            // Nếu categoryId hoặc brandId là chuỗi rỗng thì coi như không truyền

            if (!data.productName || !data.price || !data.productImage || !data.categoryId || !data.brandId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            }

            // Nếu categoryId tồn tại thì kiểm tra
            if (data.categoryId) {
                const category = await db.Category.findByPk(data.categoryId);
                if (!category) return resolve({ errCode: 2, errMessage: 'Category does not exist' });
            }

            // Nếu brandId tồn tại thì kiểm tra
            if (data.brandId) {
                const brand = await db.Brand.findByPk(data.brandId);
                if (!brand) return resolve({ errCode: 3, errMessage: 'Brand does not exist' });
            }

            let detailImgString = null;
            if (data.productDetailImg && Array.isArray(data.productDetailImg)) {
                detailImgString = JSON.stringify(data.productDetailImg);
            } else if (typeof data.productDetailImg === 'string') {
                detailImgString = data.productDetailImg;
            }

            let newProduct = await db.Product.create({
                productName: data.productName,
                description: data.description,
                price: data.price,
                categoryId: data.categoryId,  // có thể undefined => Sequelize sẽ gán NULL
                brandId: data.brandId,
                productImage: data.productImage,
                productDetailImg: data.productDetailImg // nếu bạn có field này
            });

            resolve({
                errCode: 0,
                errMessage: "Ok",
                product: newProduct
            });

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const DeleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing productId"
                });
            }

            let product = await db.Product.findOne({
                where: { productId: productId }
            });

            if (!product) {
                return resolve({
                    errCode: 1,
                    errMessage: "The product isn't exist"
                });
            } else {
                await db.Product.destroy({
                    where: { productId: productId }
                });

                resolve({
                    errCode: 0,
                    errMessage: 'Delete product success'
                });
            }

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const UpdateProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.productId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing product Id'
                });
            }

            let product = await db.Product.findOne({
                where: { productId: data.productId }
            });

            if (!product) {
                return resolve({
                    errCode: 1,
                    errMessage: "The product isn't exist"
                });
            }


            // Ép kiểu categoryId và brandId nếu bị rỗng string
            data.categoryId = data.categoryId === '' ? undefined : data.categoryId;
            data.brandId = data.brandId === '' ? undefined : data.brandId;

            // Kiểm tra khóa ngoại tồn tại
            if (data.categoryId) {
                const category = await db.Category.findByPk(data.categoryId);
                if (!category) return resolve({ errCode: 2, errMessage: 'Category does not exist' });
            }

            if (data.brandId) {
                const brand = await db.Brand.findByPk(data.brandId);
                if (!brand) return resolve({ errCode: 3, errMessage: 'Brand does not exist' });
            }



            product.productName = data.productName ?? product.productName;
            product.description = data.description ?? product.description;
            product.price = data.price ?? product.price;
            product.categoryId = data.categoryId ?? product.categoryId;
            product.brandId = data.brandId ?? product.brandId;
            product.productImage = data.productImage ?? product.productImage;

            if (data.productDetailImg) {
                if (Array.isArray(data.productDetailImg)) {
                    product.productDetailImg = JSON.stringify(data.productDetailImg);
                } else if (typeof data.productDetailImg === 'string') {
                    product.productDetailImg = data.productDetailImg;
                }
            }

            let updateProduct = await product.save();

            resolve({
                errCode: 0,
                errMessage: 'Update product success',
                product: updateProduct
            });

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const GetProductById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing productId"
                });
            }

            const response = await db.Product.findOne({
                where: { productId: productId },
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                        attributes: ['categoryName']
                    },
                    {
                        model: db.Brand,
                        as: 'brand',
                        attributes: ['brandName']
                    },
                    {
                        model: db.BatchDetail,
                        as: 'batchDetails'
                    }

                ]
            });

            if (response) {
                return resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    product: response
                });
            } else {
                return resolve({
                    errCode: 1,
                    errMessage: "Product isn't exist"
                });
            }

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

export default {
    GetAllProduct,
    GetProductByPage,
    CreateNewProduct,
    DeleteProduct,
    UpdateProduct,
    GetProductById
};
