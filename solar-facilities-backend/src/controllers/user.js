import { UserModel } from "../model/user.js";
import { compare, toHash } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  const validations = Object.keys(req.body);

  if (
    !validations.includes("name") ||
    !validations.includes("email") ||
    !validations.includes("password")
  ) {
    return res.status(400).send({ message: "Bad request: Missing fields" });
  }
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ message: "Bad request: User not allowed" });
  }

  const hashed = await toHash(password);

  const user = await UserModel.create({ name, email, password: hashed });

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY,
  );

  return res.status(201).send({ token: userJwt, id: user.id });
}

export async function loginUser(req, res) {
  const validations = Object.keys(req.body);

  if (!validations.includes("email") || !validations.includes("password")) {
    return res.status(400).send({ message: "Bad request: Missing fields" });
  }
  const { email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    return res
      .status(400)
      .send({ message: "Bad request: User does not exist" });
  }

  const isEqualPass = await compare(existingUser.password, password);

  if (!isEqualPass) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY,
  );

  return res.status(200).send({ token: userJwt, id: existingUser.id });
}
