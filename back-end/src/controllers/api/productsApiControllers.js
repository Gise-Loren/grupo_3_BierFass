const db = require('../../database/models');

const productsApiControllers = {
    list: async (req, res) => {
        try {
            let products = await db.Products.findAll({ include: ['category', 'type'] })
            let categories = await db.Category.findAll({ include: ['products'] })
            let types = await db.Types.findAll({ include: ['products'] })
            products.forEach(element => {
                element.dataValues.datail = `/api/products/${element.dataValues.id}`,
                    delete element.dataValues.category_id;
                delete element.dataValues.type_id;
                delete element.dataValues.imagen;
                delete element.dataValues.alcohol;
                delete element.dataValues.description;
                delete element.dataValues.bitterness;
                delete element.dataValues.idealTemperature;
            });
            let countByProducts = products.length

            let countByCategory = {
                Industrial: categories[0].products.length,
                Artesanal: categories[1].products.length
            }
            let countByType = {
                Rubia: types[0].products.length,
                Negra: types[1].products.length,
                Roja: types[2].products.length,
                Ipa: types[3].products.length,
                DobleIpa: types[4].products.length,
                Apa: types[5].products.length,
                Lager: types[6].products.length,
                DobleMalta: types[7].products.length,
                VeraIpa: types[8].products.length,
                Wiesse: types[9].products.length,

            }
            let countTypes = types.length
            return res.json({
                code: 200,
                msg: "success",
                countByProducts,
                countTypes,
                countByCategory,
                countByType,
                data: products
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    productId: async (req, res) => {
        try {
            let product = await db.Products.findByPk(req.params.id, {
                include: ['category', 'type']
            })
            product.dataValues.img = `http://localhost:5000/img/${product.dataValues.imagen}`
            delete product.dataValues.type_id,
            delete product.dataValues.imagen,
            delete product.dataValues.category_id


            return res.json({ 
                code: 200,
                msg: "success",
                data: product
             })
        }
        catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    productsByCategory: async (req, res) => {
        try {
            let products = await db.Products.findAll({ include: ['category', 'type'] })
            let categories = await db.Category.findAll({ include: ['products'] })
            let types = await db.Types.findAll({ include: ['products'] })
            products.forEach(element => {
                element.dataValues.datail = `/api/products/${element.dataValues.id}`,
                    delete element.dataValues.category_id;
                delete element.dataValues.type_id;
                delete element.dataValues.imagen;
                delete element.dataValues.alcohol;
                delete element.dataValues.description;
                delete element.dataValues.bitterness;
                delete element.dataValues.idealTemperature;
            });
            let countByProducts = products.length

            let listOfCategories = {
                Industrial: categories[0].products,
                Artesanal: categories[1].products
            }
            let countByType = {
                Rubia: types[0].products.length,
                Negra: types[1].products.length,
                Roja: types[2].products.length,
                Ipa: types[3].products.length,
                DobleIpa: types[4].products.length,
                Apa: types[5].products.length,
                Lager: types[6].products.length,
                DobleMalta: types[7].products.length,
                VeraIpa: types[8].products.length,
                Wiesse: types[9].products.length,

            }
            let lists =[ {
                id: 1,
                name: 'Artesanal',
                count: categories[1].products.length,
                list: categories[1].products
            },
            {
                id:2,
                name: 'Industrial',
                count: categories[0].products.length,
                list: categories[0].products,
            }]
            return res.json({
                code: 200,
                msg: "success",
                listOfCategories,
                lists

                
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    lastProduct: async (req, res) => {
        try {
            let lastProductInDb =  await db.Products.findAll({ 
                include: ['category', 'type'],
                order:[['id', 'DESC']],
                limit: 1 })
            lastProductInDb.forEach(element=> {
                element.dataValues.images = `http://localhost:5000/img/${element.dataValues.imagen}`
                delete element.dataValues.type_id
                delete element.dataValues.category_id
                delete element.dataValues.imagen
               
            });

            return res.json({
                code: 200,
                msg: "success",
                data: lastProductInDb   
            });
        }
        catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    artesanal: async (req, res) => {
        try {
            let products = await db.Products.findAll({ include: ['category', 'type'] })
            let categories = await db.Category.findAll({ include: ['products'] })
            let types = await db.Types.findAll({ include: ['products'] })
                products.forEach(element => {
                element.dataValues.datail = `/api/products/${element.dataValues.id}`,
                element.dataValues.img = `http://localhost:5000/img/${element.dataValues.imagen}`
                delete element.dataValues.category_id;
                delete element.dataValues.type_id;
                delete element.dataValues.imagen;
                delete element.dataValues.alcohol;
                delete element.dataValues.description;
                delete element.dataValues.bitterness;
                delete element.dataValues.idealTemperature;
            });
          
          
            
            return res.json({
                code: 200,
                msg: "success",
                name: 'Artesanal',
                list: categories[1].products

                
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    },
    industrial: async (req, res) => {
        try {
            let products = await db.Products.findAll({ include: ['category', 'type'] })
            let categories = await db.Category.findAll({ include: ['products'] })
            let types = await db.Types.findAll({ include: ['products'] })
            products.forEach(element => {
                element.dataValues.datail = `/api/products/${element.dataValues.id}`,
                    delete element.dataValues.category_id;
                delete element.dataValues.type_id;
                delete element.dataValues.imagen;
                delete element.dataValues.alcohol;
                delete element.dataValues.description;
                delete element.dataValues.bitterness;
                delete element.dataValues.idealTemperature;
            });
            let countByProducts = products.length

            let listOfCategories = {
                Industrial: categories[0].products,
                Artesanal: categories[1].products
            }
            let countByType = {
                Rubia: types[0].products.length,
                Negra: types[1].products.length,
                Roja: types[2].products.length,
                Ipa: types[3].products.length,
                DobleIpa: types[4].products.length,
                Apa: types[5].products.length,
                Lager: types[6].products.length,
                DobleMalta: types[7].products.length,
                VeraIpa: types[8].products.length,
                Wiesse: types[9].products.length,

            }
           
            return res.json({
                code: 200,
                msg: "success",
                id: 2,
                name: 'Industrial',
                list: categories[0].products

                
            });
        } catch (error) {
            res.json({
                code: 500,
                msg: error
            });
        }
    }
}


module.exports = productsApiControllers;