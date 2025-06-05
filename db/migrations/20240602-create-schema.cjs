'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("👉 Migration started");
    try {
      // Roles
      await queryInterface.createTable('Roles', {
        roleId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        code: Sequelize.STRING,
        description: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      // Users
      await queryInterface.createTable('Users', {
        userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        password: Sequelize.STRING,
        email: { type: Sequelize.STRING, unique: true },
        phoneNumber: Sequelize.STRING,
        address: Sequelize.STRING,
        // assignAt: Sequelize.DATE,
        isActive: Sequelize.BOOLEAN,
        image: Sequelize.STRING,
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
            key: 'roleId'
          },
          onDelete: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      //Cart
      await queryInterface.createTable('Carts', {
        CartId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE'
        },
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
      //Size
      await queryInterface.createTable('Sizes', {
        sizeId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        sizeNumber: Sequelize.DECIMAL,
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
        // promotionId: Sequelize.INTEGER,
        sizeId: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
      // Products
      await queryInterface.createTable('Products', {
        productId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        productName: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories',
            key: 'categoryId'
          },
          onDelete: 'CASCADE'
        },
        productImage: Sequelize.STRING,
        Stock: Sequelize.INTEGER,

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      //Cart Item
      await queryInterface.createTable('CartItems', {
        CartItemId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        CartId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Carts',
            key: 'CartId'
          },
          onDelete: 'CASCADE'
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Products',
            key: 'productId'
          },
          onDelete: 'CASCADE'
        },
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 1
        },
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
        batchId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Batches',
            key: 'batchId'
          },
          onDelete: 'CASCADE'
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'productId'
          },
          onDelete: 'CASCADE'
        },
        quantity: Sequelize.INTEGER,
        costPrice: Sequelize.DECIMAL,
        promotionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Promotions',
            key: 'promotionId'
          },
          onDelete: 'SET NULL'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      // Payments
      await queryInterface.createTable('Payments', {
        paymentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        amount: Sequelize.DECIMAL,
        method: Sequelize.STRING,
        status: Sequelize.STRING,
        paymentUrl: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      // Orders
      await queryInterface.createTable('Orders', {
        orderId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE'
        },
        paymentId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Payments',
            key: 'paymentId'
          },
          onDelete: 'SET NULL'
        },
        status: Sequelize.STRING,
        totalPrice: Sequelize.DECIMAL,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });

      // OrderDetails
      await queryInterface.createTable('OrderDetails', {
        orderDetailId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Orders',
            key: 'orderId'
          },
          onDelete: 'CASCADE'
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'productId'
          },
          onDelete: 'CASCADE'
        },
        unitPrice: Sequelize.DECIMAL,
      });

      // Transactions
      await queryInterface.createTable('Transactions', {
        transactionId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        paymentId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Payments',
            key: 'paymentId'
          },
          onDelete: 'CASCADE'
        },
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
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'userId'
          },
          onDelete: 'CASCADE'
        },
        orderDetailId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'OrderDetails',
            key: 'orderDetailId'
          },
          onDelete: 'CASCADE'
        },
        rating: Sequelize.INTEGER,
        comment: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    } catch (error) {
      console.error("🔥 MIGRATION ERROR:", error);
      throw error; // rất quan trọng
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
    await queryInterface.dropTable('Transactions');
    await queryInterface.dropTable('OrderDetails');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Payments');
    await queryInterface.dropTable('Sizes');
    await queryInterface.dropTable('BatchDetails');
    await queryInterface.dropTable('Batches');
    await queryInterface.dropTable('Promotions');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('CartItems');
    await queryInterface.dropTable('Carts');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
  }
};
