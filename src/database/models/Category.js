module.exports = (sequelize, dataTypes) =>{
    let alias = 'Category';
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

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
		Category.hasMany(models.Products, {
			as: "products",
			foreignKey: "category_id"
		})
	}
    return Category;
}