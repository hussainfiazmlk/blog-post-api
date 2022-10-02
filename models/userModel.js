import Sequelize from "sequelize";

import connection from "../config/database.js";

const User = connection.define(
  "Users",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    fullname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: (users) => {
        users.fullname = `${users.firstname} ${users.lastname}`;
      },
    },
  }
);

export default User;
