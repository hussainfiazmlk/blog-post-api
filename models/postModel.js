import Sequelize from "sequelize";

import connection from "../config/database.js";

const Post = connection.define("Posts", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
});

export default Post;
