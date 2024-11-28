"use strict";

import express from "express";
import Movie from "../controllers/movie.js";
import { celebrate, Joi, errors  } from "celebrate";

const router = express.Router();

router.post("/new", celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        year: Joi.number().required(),
        description: Joi.string().required(),
        director: Joi.string().required(),
        genre: Joi.string().required(),
        poster: Joi.string().required(),
        trailer: Joi.string().required(),
        region: Joi.string().required(),
        time: Joi.number().required()
    }),
}), async (req, res, next) => {
    try {
        const { body : data } = req;
        const response = await Movie.create(data);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }  
});

router.get("/:id", async (req, res, next) => {
    try {
        const MovieClass = new Movie(req.params.id);
        const response = await MovieClass.getById();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { body : data } = req;
        const MovieClass = new Movie(req.params.id);
        const response = await MovieClass.update(data);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/search/name", celebrate({
    body: Joi.object().keys({
        name: Joi.string().required()
    })
}) ,async (req, res, next) => {
    try {
        const { body : data } = req;
        const response = await Movie.getByName(data);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/search/genre", celebrate({
    body: Joi.object().keys({
        genre: Joi.string().required()
    })
}), async (req, res, next) => {
    try {
        const { body : data } = req;
        const response = await Movie.getByGenre(data);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

router.use(errors());
export default router;