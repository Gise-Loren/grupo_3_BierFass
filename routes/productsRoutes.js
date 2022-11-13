const express = require ("express");
const { prodcutsProcess } = require("../controllers/productsControllers");

const router = express.Router();

const productsControllers = require ("../controllers/productsControllers");

const upload = require("../middlewares/multerProducts") // <----- SACAMOS DE ROUTES MULTER Y LO AGREGAMOS EN MIDDLEWARES 

router.get("/products", productsControllers.index); // <------ LISTADO DE PRODUCTOS.

router.get('/products/list', productsControllers.list)

router.delete('/products/:id/list', productsControllers.deleteProductsList)

router.get('/products/create', productsControllers.createProducts); // <------ FORMULARIO DE CREACION DE PRODUCTOS.

router.get('/products/:id', productsControllers.productsId); // <------ DETALLE DE UN PRODUCTO EN PARTICULAR.

router.post('/products/', upload.any(), productsControllers.prodcutsProcess); // <------ ACCION DE CREACION DE PRODUCTOS.

router.get("/products/:id/edit", productsControllers.editProduct); // <------ FORMULARIO DE EDICION DE PRODUCTOS.

router.put("/products/:id", upload.any() ,productsControllers.updateProducts); // <------ ACCION DE EDICION DE PRODUCTOS.
 
router.delete("/products/:id", productsControllers.deleteProducts); // <------ ACCION DE BORRADO.




module.exports = router;
