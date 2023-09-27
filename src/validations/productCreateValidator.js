const {check, body} = require('express-validator');
module.exports = [
    check('name')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isAlpha().withMessage('Sólo se admiten alfanuméricos'),
    check('price')
    .notEmpty().withMessage('Éste campo es obligatorio').bail()
    .isDecimal().withMessage('Sólo se admiten números'),
   check('categoryId')
   .notEmpty().withMessage('Éste campo es obligatorio'),
   check('description')
   .notEmpty().withMessage('Éste campo es obligatorio'),
   body('image')
    .custom((value, {req}) => {
        if(req.file) {
            return true
        }
        return false
    }).withMessage('Debe agregar una imagen al producto')
        
]