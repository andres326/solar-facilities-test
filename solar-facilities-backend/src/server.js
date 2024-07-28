import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./graphql/index.js";
import { connect } from "./utils/mongodb.js";
import { saveFileRouter } from "./routes/file.js";

dotenv.config();

connect();

const PORT = process.env.PORT || 4000;

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ request, response }) => ({
      request: request,
      response: response,
    }),
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", saveFileRouter);

httpServer.listen({ port: PORT }, () =>
  console.log(`🚀  Server ready at http://localhost:${PORT}`),
);
