'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Users
    await queryInterface.createTable('Users', {
      userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      password: Sequelize.STRING,
      email: { type: Sequelize.STRING, unique: true },
      phoneNumber: Sequelize.STRING,
      address: Sequelize.STRING,
      assignAt: Sequelize.DATE,
      isActive: Sequelize.BOOLEAN,
      image: Sequelize.STRING,
      roleId: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Roles
    await queryInterface.createTable('Roles', {
      roleId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      code: Sequelize.STRING,
      description: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Products
    await queryInterface.createTable('Products', {
      productId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      productName: Sequelize.STRING,
      description: Sequelize.STRING,
      price: Sequelize.DECIMAL,
      categoryId: Sequelize.INTEGER,
      productImage: Sequelize.STRING,
      Stock: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Categories
    await queryInterface.createTable('Categories', {
      categoryId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      categoryName: Sequelize.STRING,
      description: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Batches
    await queryInterface.createTable('Batches', {
      batchId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      arrivalDate: Sequelize.DATE,
      totalCost: Sequelize.DECIMAL,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // BatchDetails
    await queryInterface.createTable('BatchDetails', {
      batchDetailId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      batchId: Sequelize.INTEGER,
      productId: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
      costPrice: Sequelize.DECIMAL,
      promotionId: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Promotions
    await queryInterface.createTable('Promotions', {
      promotionId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      promotionName: Sequelize.STRING,
      description: Sequelize.STRING,
      discountPercent: Sequelize.DECIMAL,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
      minimumAmount: Sequelize.DECIMAL,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Orders
    await queryInterface.createTable('Orders', {
      orderId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: Sequelize.INTEGER,
      orderDate: Sequelize.DATE,
      status: Sequelize.STRING,
      totalAmount: Sequelize.DECIMAL,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // OrderDetails
    await queryInterface.createTable('OrderDetails', {
      orderDetailId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: Sequelize.INTEGER,
      productId: Sequelize.INTEGER,
      unitPrice: Sequelize.DECIMAL,
      amount: Sequelize.INTEGER,
      batchId: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Payments
    await queryInterface.createTable('Payments', {
      paymentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      orderId: Sequelize.INTEGER,
      amount: Sequelize.DECIMAL,
      method: Sequelize.STRING,
      status: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Transactions
    await queryInterface.createTable('Transactions', {
      transactionId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      paymentId: Sequelize.INTEGER,
      transactionDate: Sequelize.DATE,
      amount: Sequelize.DECIMAL,
      status: Sequelize.STRING,
      message: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    // Reviews
    await queryInterface.createTable('Reviews', {
      reviewId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: Sequelize.INTEGER,
      orderDetailId: Sequelize.INTEGER,
      rating: Sequelize.INTEGER,
      comment: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
    await queryInterface.dropTable('Transactions');
    await queryInterface.dropTable('Payments');
    await queryInterface.dropTable('OrderDetails');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Promotions');
    await queryInterface.dropTable('BatchDetails');
    await queryInterface.dropTable('Batches');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Roles');
    await queryInterface.dropTable('Users');
  }
};
