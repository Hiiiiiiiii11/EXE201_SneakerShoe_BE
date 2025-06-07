// config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sneaker Shoe API',
        version: '1.0.0',
        description: 'API Documentation for Sneaker Shoe Backend',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ],
    tags: [
    { name: 'Auth', description: 'Đăng nhập và xác thực' },
    { name: 'User', description: 'Quản lý người dùng' }, 
    { name: 'Roles', description: 'Quản lý phân quyền' },
    { name: 'Products', description: 'Quản lý sản phẩm' },
    { name: 'Category', description: 'Quản lý danh mục sản phẩm' },
    { name: 'Size', description: 'Quản lý size giày' },
    { name: 'Brands', description: 'Quản lý thương hiệu sản phẩm' },
    { name: 'Promotion', description: 'Quản lý khuyến mãi' },
    { name: 'Carts', description: 'Quản lý giỏ hàng' },
    { name: 'Orders', description: 'Quản lý đơn hàng' },
    { name: 'Payment', description: 'Quản lý thanh toán' },
    { name: 'Review', description: 'Đánh giá sản phẩm' },
    { name: 'Favorites', description: 'Quản lý sản phẩm yêu thích' },
    { name: 'Batches', description: 'Quản lý lô hàng nhập' },
    { name: 'BatchDetails', description: 'Chi tiết lô hàng nhập' },
    { name: 'Upload', description: 'Upload ảnh sản phẩm' },

  ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
