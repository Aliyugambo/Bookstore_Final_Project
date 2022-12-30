const Joi = require('joi');
const BookAddSchema = Joi.object({
    title: Joi.string()
            .min(5)
            .max(255)
            .trim()
            .required(),

    shortDescription: Joi.string()
            .min(5)
            .max(255)
            .trim()
            .optional(),

    longDescription: Joi.string()
            .min(5)
            .max(255)
            .trim()
            .optional(),

    year: Joi.number()
            .integer()
            .required()
            .max(2022),

     isbn: Joi.string()
                .min(10)
                .max(15)
                .required(),

    price: Joi.number()
            .min(0)
            .required(),
            
    createAt: Joi.date()
            .default(Date.now),

    lastUpdateAt: Joi.date()
            .default(Date.now)
});

const BookUpdateSchema = Joi.object({
        title: Joi.string()
                .min(5)
                .max(255)
                .trim()
                .optional(),
    
        shortDescription: Joi.string()
                .min(5)
                .max(255)
                .trim()
                .optional(),
    
        longDescription: Joi.string()
                .min(5)
                .max(255)
                .trim()
                .optional(),
    
        year: Joi.number()
                .integer()
                .optional()
                .max(2022),
    
         isbn: Joi.string()
                    .min(10)
                    .max(15)
                    .optional(),
    
        price: Joi.number()
                .min(0)
                .optional()
    });

async function AddBookValidationMW(req, res, next){
        const bookPayLoad = req.body;

        try {
           await BookAddSchema.validateAsync(bookPayLoad); 
           next();     
        } catch (error) {
           next({
                message: error.details[0].message,
                status: 400
           }) ;    
        }

        
}

async function UpdateBookValidationMW(req, res, next){
        const bookPayLoad = req.body;

        try {
           await BookUpdateSchema.validateAsync(bookPayLoad); 
           next();     
        } catch (error) {
           next({
                message: error.details[0].message,
                status: 400
           }) ;    
        }

        
}
module.exports = {
        AddBookValidationMW,
        UpdateBookValidationMW
};