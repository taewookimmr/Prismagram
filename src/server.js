import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils"
const dotenv = require('dotenv');
dotenv.config();


sendSecretMail("taewookimmr@gmail.com", "123")
const PORT = process.env.PORT || 4000;
console.log(`what is the port in use : ${process.env.PORT}`)

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));

server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));