const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
    // sequelize.model을 상속하는 user 모델 정의, exports하여 모듈로
    static init(sequelize) { // static int 메소드, 테이블에 대한 설정
        return super.init({ // 첫 번째 매개변수: 테이블 컬럼에 대한 설정, MySQL
            // id: 자동적으로 기본 키로 연결, 따로 설정 불필요
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            }, 
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, { // 두 번째 매개변수: 테이블 자체에 대한 설정
            sequelize, // DB 연결 객체
            timestamps: false, // true 일경우 createdAt, updateAt(camel case) 필드가 자동적으로 생성
            underscored: false, // true면 created_at, updated_at(snake case) 필드명이 변경
            modelName: 'User',
            tableName: 'users',
            paranoid: false, // true일 경우 deletedAt 필드가 자동 생성, 로우를 복원해야하는 상황이 생길 것 같다면 미리 true로 설정
            charset: 'utf8', // 이모티콘 사용하려면, uft8mb4
            collate:'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
    } // static associate 메소드, 다른 모델과의 관계를 설정
};