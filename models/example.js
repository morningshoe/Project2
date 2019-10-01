module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    author: DataTypes.STRING,
    post: DataTypes.TEXT
  });
  return Article;
};
