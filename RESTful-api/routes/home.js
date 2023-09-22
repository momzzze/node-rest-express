import express from 'express';
import Joi from "joi";

const router=express.Router();

router.get("/", (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

router.get('/api/post/:year/:month', (req, res) => {
    res.send(req.query);
});

export {router as home}