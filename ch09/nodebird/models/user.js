const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model { // user 모델에 해당하는 부분
  static init(sequelize) { // 컬럼 생성
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: { // 로그인 제공을 하는 것 구분 (local or SNS Login Service 제공자 명)
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: { // SNS 로그인 서비스 이용시 SNS ID를 저장
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt 컬럼 자동 생성
      underscored: false, // created_At 등등이 아닌 createdAt이 됨
      modelName: 'User',
      tableName: 'users',
      paranoid: true, // deletedAt 컬럼 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { // 다른 모델(table)과의 관계 설정
    db.User.hasMany(db.Post); // 1:N의 관계, user.getPosts(), user.addPost() 메소드 자동 사용 가능하게됨
    db.User.belongsToMany(db.User, { // 팔로워:팔로잉 관계 -- N:M 관계, 그림 9-5 참조
      foreignKey: 'followingId', // UserID를 외래키 값으로 참조
      as: 'Followers',
      through: 'Follow', // db.sequelize.models.Follow라는 모델을 사용가능하게 된다.
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',// UserID를 외래키 값으로 참조, 자동으로 설정됨
      as: 'Followings',
      through: 'Follow', // user.getFollowers(), user.getFollowings()
    });
  }
};
