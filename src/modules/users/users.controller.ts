import { Elysia, t } from "elysia";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const usersController = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  })
  .post("/", async ({ body }) => {
    const newUser = await db.insert(users).values(body).returning();
    return newUser[0];
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" })
    })
  });
