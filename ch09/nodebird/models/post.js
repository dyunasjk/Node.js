const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140), // 트위터처럼 140자 나타내기
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false, // deletedAt 필드 안생김
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    // N:1관계, post.getUser(), post.addUser() 사용 가능, 관계에 주의하여 작성(복수가 되느냐 단수가 되느냐가 결정됨)
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    // 게시글:해시태그=N:M 관계, 328페이지 그림7-59 참조
    // postId, hashtagId가 외래키가 됨
    // post.getHashtags(), post.addHashtags(), hashtag.getPosts() 등 사용가능
  } 
};
