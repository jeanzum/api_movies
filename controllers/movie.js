"use strict";

import MovieSchema from "../models/movie.js";
import boom from "@hapi/boom";

class Movie {
  constructor(id) {
    this.id = id;
  }

  static async create(data) {
    const response = await MovieSchema.findOneAndUpdate(
      { name: data.name },
      data,
      { upsert: true, new: true }
    );
    return response;
  }

  async update(data) {
    const response = await MovieSchema.findByIdAndUpdate(this.id, data, {});
    if (!response) throw boom.notFound("This movie not exist");
    return response; 
  };

  async getById() {
    const response = await MovieSchema.findById(this.id);

    if (!response) throw boom.notFound("This movie not exist");
    return response;
  }

  static async getByName(data) {
    const response = await MovieSchema.find({
      name: { $regex: data.name, $options: "i" }
    });

    if (!response.length) throw boom.notFound("This movie not exist");
    return response;
  }

  static async getByGenre(data) {
    const response = await MovieSchema.find({genre: { $regex: data.genre, $options: "i" }});
    if (!response.length) throw boom.notFound("This movie not exist");
    return response;
  }
}

export default Movie;