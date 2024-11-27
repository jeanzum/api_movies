"use strict";

import createServer from "./server.js";
import mongoose, { mongo } from "mongoose";
import config from "./config/index.js";

mongoose.connect(`mongodb://${config.mongoUrl}/${config.mongoDB}`)
    .then(() => {
        const app = createServer();
        app.listen(3000, () => {
            console.log(config.NODE_ENV);
            console.log("Server has started")
        });
    })
    .catch(e => console.log(e));

