const Joi=require('@hapi/joi');
const authSchema=Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    name:Joi.string().min(3).max(30),
    role:Joi.string().default('user'),    
})


module.exports={
    authSchema
}