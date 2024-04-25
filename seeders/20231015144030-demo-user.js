"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "fadhlan",
        age: 20,
        address: "Bogor",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Juki",
        age: 20,
        address: "Bekasi",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jojo",
        age: 20,
        address: "Bekasi",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kukuh",
        age: 22,
        address: "Bogor",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tipen",
        age: 22,
        address: "Bekasi",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const insertUsers = await queryInterface.bulkInsert("Users", users, {
      returning: true,
    });

    const password = await bcrypt.hash('admin123', 10);

    const auths = insertUsers.map((user) => ({
      email: `${user.name}@gmail.com`,
      password: password,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Auths", auths);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
