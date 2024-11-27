"use strict";

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;

dotenv.config({
    path: path.resolve(__dirname, `../${envFile.trim()}`),
});

const config = {
    dev: process.env.NODE_ENV !== "production",
    NODE_ENV: process.env.NODE_ENV,
    mongoUser: process.env.MONGO_USER,
    mongoPass: process.env.MONGO_PASS,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB
};

export default config;