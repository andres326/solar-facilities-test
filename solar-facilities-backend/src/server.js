import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "./graphql/index.js";
import { connect } from "./utils/mongodb.js";
import { saveFileRouter } from "./routes/file.js";
import { userRouter } from "./routes/user.js";
import { GraphQLError } from "graphql";
import { UserModel } from "./model/user.js";

dotenv.config();

connect();

const PORT = process.env.PORT || 4000;

const app = express();

const httpServer = http.createServer(app);

const context = async ({ req, response }) => {
  const token = req?.headers?.authorization || "";

  if (!token) {
    throw new GraphQLError("Token was not provided", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  const userData = jwt.verify(token, process.env.JWT_KEY);
  const user = UserModel.findById(userData.id);

  if (!user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });

  return {
    req,
    response,
    user,
  };
};

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
    context: context,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", saveFileRouter);
app.use("/api/user", userRouter);

httpServer.listen({ port: PORT }, () =>
  console.log(`🚀  Server ready at http://localhost:${PORT}`),
);
