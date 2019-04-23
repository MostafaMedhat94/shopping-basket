import * as dotenv from "dotenv";
import { Server } from "http";

import app from "./app";

// // Initialize environment variables
// dotenv.config();

// Initialzie the server
const server = new Server(app);
// Set the server PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

export default server;
