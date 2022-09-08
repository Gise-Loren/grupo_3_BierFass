const express = require ("express");
const router = express.Router();
const productsControllers = require ("../controllers/productsControllers");


//Requiere todos los productos.
router.get("/", productsControllers.index);

//Crear productos
router.get('/create', productsControllers.createProducts);
router.post("/", productsControllers.newProducts);

//Eliminar prodcutos.
router.delete("/:id", productsControllers.deleteProducts);

//requerir producto por id
router.get('/:id', productsControllers.productsId);

//modificar productos
router.get("/:id/edit", productsControllers.modifyProducts);
router.put("/:id",productsControllers.updateProducts);


module.exports = router;
