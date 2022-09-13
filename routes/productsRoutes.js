const express = require ("express");

const router = express.Router();

const productsControllers = require ("../controllers/productsControllers");

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/img');
    },
    filename: (req, file, callback) => {

        callback(null, "../img/imgBier" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

router.get("/", productsControllers.index); // <------ LISTADO DE PRODUCTOS.

router.get('/create', productsControllers.createProducts); // <------ FORMULARIO DE CREACION DE PRODUCTOS.

router.get('/:id', productsControllers.productsId); // <------ DETALLE DE UN PRODUCTO EN PARTICULAR.

router.post('/', upload.any(), productsControllers.prodcutsProcess); // <------ ACCION DE CREACION DE PRODUCTOS.

router.get("/:id/edit", productsControllers.editProduct); // <------ FORMULARIO DE EDICION DE PRODUCTOS.

router.put("/:id", upload.any() ,productsControllers.updateProducts); // <------ ACCION DE EDICION.
 
router.delete("/:id", productsControllers.deleteProducts); // <------ ACCION DE BORRADO.

module.exports = router;
