import Sequelize from "sequelize";

import connection from "../config/database.js";

const Post = connection.define("Comments", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  comment: Sequelize.TEXT,
});

export default Post;
