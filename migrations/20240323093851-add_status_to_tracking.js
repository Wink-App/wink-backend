'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tracking', 'status', {
      type: DataTypes.ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'), // Assuming these are the possible status values
      allowNull: false,
      defaultValue: 'PENDING',
      comment: 'Order Status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tracking', 'status');
  }
};
