import express from 'express';
import Joi from "joi";

const router=express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

export {router as home}