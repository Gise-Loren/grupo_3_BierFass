module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { 
            type: dataTypes.STRING(15)
        },
        latname: { 
            type: dataTypes.STRING(15)
        },
        email: {
            type: dataTypes.STRING(25) 
        },
        password:{ 
            type: dataTypes.STRING(200)
        }, 
        category: {
            type: dataTypes.STRING(15) 
        },
        imagen: {
            type: dataTypes.STRING(200) 
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}