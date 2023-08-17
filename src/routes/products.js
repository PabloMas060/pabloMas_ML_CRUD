// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadImage} = require('../middlewares/upload')




// ************ Controller Require ************
const {index, create, store, detail, edit, update, destroy} = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/create', uploadImage.single('image'), store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/update/:id', update); 


/*** DELETE ONE PRODUCT***/ 

router.delete('/delete/:id', destroy); 


module.exports = router;
