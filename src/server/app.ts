import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import * as expressValidator from "express-validator";
import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as swaggerUI from "swagger-ui-express";
import * as yaml from "js-yaml";

import router from "../routes";

const app: express.Application = express();

// Get swagger.yaml config file
const swaggerDocument = yaml.safeLoad(
    fs.readFileSync(
        path.resolve(__dirname + "../../../../APIDocs.yaml"),
        "utf8",
    ),
);

// Securing app requests
app.use(helmet());

// Enable cors
app.use(cors());

// Parse incoming requests' bodies a JSON
app.use(bodyParser.json({ limit: "50mb", type: "*/*" }));

// Log app requests
app.use(morgan("combined"));

// Validate incoming requests
app.use(expressValidator());

// Generate APIs' Docs UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Handle Routing
app.use(router);

// System Error Handling
app.use(
    (
        error: { message: String },
        req: Request,
        res: Response,
        next?: NextFunction,
    ): void => {
        // Log the error message to the server
        console.log(error.message);
        // Send a custom error message to the end user
        res.status(400).send({ message: "Unexpected error happened!" });
    },
);

export default app;
