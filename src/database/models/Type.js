module.exports = (sequelize, dataTypes) =>{
    let alias = 'Types';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: { 
            type: dataTypes.STRING(15)
        }
    };
    let config = {
        tableName: 'Types',
        timestamps: false
    };

    const Type = sequelize.define(alias, cols, config);

    Type.associate = function(models) {
		Type.hasMany(models.Products, {
			as: "products",
			foreignKey: "type_id"
		})
	}
    return Type;
}