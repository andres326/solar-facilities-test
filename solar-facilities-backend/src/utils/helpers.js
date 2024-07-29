import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";

export function __dirname(url) {
  return dirname(fileURLToPath(url));
}

const scryptAsync = promisify(scrypt);

export async function toHash(password) {
  const salt = randomBytes(8).toString("hex");
  const buf = await scryptAsync(password, salt, 64);

  return `${buf.toString("hex")}.${salt}`;
}

export async function compare(storePassword, suppliedPassword) {
  const [hashedPassword, salt] = storePassword.split(".");
  const buf = await scryptAsync(suppliedPassword, salt, 64);

  return buf.toString("hex") === hashedPassword;
}
