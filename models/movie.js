"use strict";

import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    director: {type: String, required: true},
    time: {type: Number, required: true},
    description: {type: String, required: true},
    trailer: {type: String, required: true},
    region: {type: String, required: true},
    poster: {type: String, required: true}
},{
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Movie", MovieSchema);