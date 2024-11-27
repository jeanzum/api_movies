"use strict";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import pug from "pug";
import path from "path";
import { fileURLToPath } from "url";

import config from "./config/index.js";
import movieRoute from "./routes/movie.js";
import { logErrors, wrapErrors, errorHandler } from './utils/middles/errorHandler.js';
import notFoundHandler from './utils/middles/notFoundHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createServer() {
    const app = express();

    // Middlewares globales
    app.use(express.json()); // Analiza JSON
    app.use(cors()); // Configura CORS
    app.use(helmet()); // Seguridad HTTP

    // Configuración de vistas
    app.engine("pug", pug.__express);
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");

    // Ruta principal
    app.get("/", (req, res) => {
        res.render("index", {
            text: "API Movies v1.0",
            dev: config.dev
        });
    });

    // Rutas
    app.use("/movie", movieRoute);
    app.use(express.static(path.join(__dirname, 'public')));

    // Middleware para manejar JSON malformados
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            console.error("Bad JSON received:", err.message);
            return res.status(400).json({ error: "Invalid JSON format" });
        }
        next(err);
    });

    // Middleware de manejo de errores
    app.use(notFoundHandler);
    app.use(logErrors);
    app.use(wrapErrors);
    app.use(errorHandler);

    return app;
}

export default createServer;
