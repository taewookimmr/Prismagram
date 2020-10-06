import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { prisma } from "../generated/prisma-client";
import { isAuthenticated } from "./middlewares";
// 서버 시작
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
const PORT = process.env.PORT || 4000;
server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
