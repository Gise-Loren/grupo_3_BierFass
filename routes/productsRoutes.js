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


//Requiere todos los productos.
router.get("/", productsControllers.index);

//Crear productos
router.get('/create', productsControllers.createProducts);
router.post('/formUser', upload.any(), productsControllers.prodcutsProcess) 

//Eliminar prodcutos.
router.delete("/:id", productsControllers.deleteProducts);

//requerir producto por id
router.get('/:id', productsControllers.productsId);

//modificar productos
router.get("/:id/edit", productsControllers.editProduct);
router.put("/:id", upload.any() ,productsControllers.updateProducts);




module.exports = router;
