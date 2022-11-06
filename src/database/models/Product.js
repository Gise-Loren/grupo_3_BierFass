module.exports = (sequelize, dataTypes) =>{
    let alias = 'Products';
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(25)
        },
        type_id: {
            type: dataTypes.INTEGER
        },
        imagen:  { 
            type: dataTypes.STRING(500)
        },
        price:  { 
            type: dataTypes.DECIMAL(11)
        },
        description:  { 
            type: dataTypes.STRING(100)
        },
        alcohol:  { 
            type: dataTypes.STRING(100)
        },
        bitterness:  { 
            type: dataTypes.DECIMAL(10)
        },
        idealTemperature:  { 
            type: dataTypes.STRING(100)
        },
        category_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false,
        paranoid:true
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
			as: "category",
			foreignKey: "category_id"
		});
        Product.belongsTo(models.Types, {
            as: "type",
            foreignKey: "type_id",
        })   
    }
    return Product;
}