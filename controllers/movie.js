"use strict";

import MovieSchema from "../models/movie.js";
import boom from "@hapi/boom";

class Movie {
    constructor(id) {
        this.id = id;
    }

    static async create(data) {
        const response = await MovieSchema.findOneAndUpdate({name: data.name}, data, {upsert: true, new: true});
        return response;
    }

    async getById(){
        const response = await MovieSchema.findById(this.id);

        if(!response) throw boom.notFound('This movie not exist');
        return response;
    }

    async getByName(name){
        const response = await MovieSchema.findOne({name: name});
        return response;
    }
}

export default Movie;