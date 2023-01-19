import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import OpenApiValidator from 'express-openapi-validator';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import resolver from './esmresolver.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Music Server",
            version: "1.0.0",
            description: "Music Server Authentication API"
        },
        servers: [{
            url: "http://localhost:3001/api",
            description: "Music Server"
        }]
    },
    apis: [
        __dirname + "/../user/**/*.yaml",
        __dirname + "/../user/**/*.mjs"
    ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
delete swaggerDocs.channels;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(OpenApiValidator.middleware({
    apiSpec: swaggerDocs,
    operationHandlers: {
        basePath: __dirname + "/../user",
        resolver
    }
}));

app.use(express.static(`${__dirname}/../public`));

export default app;