
import { where } from "sequelize"
import db from "../../db/models/index.js"

const GetAllFavorite = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await db.Favorite.findAll()
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                favorites: response
            })

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const GetFavoriteByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                })
            } else {
                const user = await db.User.findOne({
                    where: { userId: userId }
                })
                if (!user) {
                    return resolve({
                        errCode: 2,
                        errMessage: "User isn't exist"
                    })
                } else {
                    const favorite = await db.Favorite.findAll({
                        where: { userId: userId },
                        include: [{
                            model: db.FavoriteItem,
                            as: "items",

                            include: [{
                                model: db.Product,
                                as: 'product'

                            }]
                        }]

                    })
                    if (!favorite) {
                        return resolve({
                            errCode: 3,
                            errMessage: "User don't have any favorite product"
                        })
                    } else {
                        return resolve({
                            errCode: 0,
                            errMessage: 'OK',
                            favorites: favorite
                        })
                    }
                }
            }

        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}
const AddProductFavorite = (productId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId || !userId) {
                return resolve({
                    errCode: 1,
                    errMessage: " Missing required parameters"
                })
            } else {
                const product = await db.Product.findOne({
                    where: { productId: productId }
                })
                if (!product) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Product isn't exist"
                    })
                }
                const user = await db.User.findOne({
                    where: { userId: userId }
                })
                if (!user) {
                    return resolve({
                        errCode: 4,
                        errMessage: "User isn't exist"
                    })
                }
                if (!product) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Product isn't exist"
                    })
                }
                const favorite = await db.Favorite.findOne({
                    where: { userId: userId }
                })
                if (!favorite) {
                    await db.Favorite.create({ userId })
                }
                let existingFavoriteItem = await db.FavoriteItem.findOne({
                    where: {
                        favoriteId: favorite.favoriteId,
                        productId
                    }
                });
                if (existingFavoriteItem) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Product already in favorite list"
                    })
                } else {
                    await db.FavoriteItem.create({
                        favoriteId: favorite.favoriteId,
                        productId,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'Add Product favorite success'
                    })
                }
            }


        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const DeleteFavoriteItem = (productId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing productId"
                })
            } else {
                const favoritelist = await db.Favorite.findOne({
                    where: { userId: userId }
                })
                console.error("check", favoritelist)
                if (favoritelist) {
                    const product = await db.FavoriteItem.findOne({
                        where: { productId: productId }
                    })
                    if (!product) {
                        return resolve({
                            errCode: 2,
                            errMessage: "Product not exist in favorite"
                        })
                    } else {
                        const response = await db.FavoriteItem.destroy({
                            where: { productId: productId }
                        })
                        if (response) {
                            return resolve({
                                errCode: 0,
                                errMessage: "Delete product from favorite list success"
                            })
                        } else {
                            return resolve({
                                errCode: 3,
                                errMessage: 'Delete favorite product fail'
                            })
                        }
                    }
                } else {
                    return resolve({
                        errCode: 4,
                        errMessage: "User don't have favorite list"
                    })
                }

            }


        } catch (e) {
            console.error(e);
            reject(e);

        }
    })
}
const DeleteAllFavoriteItem = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                })
            } else {
                const favorite = await db.Favorite.findOne({
                    where: { userId: userId }
                })
                if (!favorite) {
                    return resolve({
                        errCode: 2,
                        errMessage: "User dont have any favorite list"
                    })

                } else {
                    await db.Favorite.destroy({
                        where: { favoriteId: favorite.favoriteId }
                    })
                    await db.FavoriteItem.destroy({
                        where: { favoriteId: favorite.favoriteId }
                    })
                    return resolve({
                        errCode: 0,
                        errMessage: "Delete all favorites item success"
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
    GetAllFavorite, GetFavoriteByUserId, DeleteFavoriteItem, AddProductFavorite, DeleteAllFavoriteItem
}