'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'Última visita',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ofertas',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
