import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { env } from "./config/env";
import { usersController } from "./modules/users/users.controller";

const app = new Elysia()
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Vibee API Documentation",
        version: "1.0.0"
      }
    }
  }))
  .onError(({ code, error }) => {
    console.error(`[Error ${code}]:`, error);
    return {
      status: "error",
      message: error.message
    };
  })
  .get("/", () => "Welcome to Vibee API!")
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .use(usersController)
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
