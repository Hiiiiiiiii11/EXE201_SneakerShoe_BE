// config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sneaker Shoe API',
        version: '1.0.0',
        description: 'API Documentation for Sneaker Shoe Backend',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
