import { Hono } from "hono";
import * as usersService from "../services/users.service.js";

const usersRoutes = new Hono();

usersRoutes.post("/", async (c) => {
  const body = await c.req.json<{ name?: string; email?: string }>();

  if (!body.name || !body.email) {
    return c.json({ error: "name and email are required" }, 400);
  }

  try {
    const user = await usersService.createUser({
      name: body.name,
      email: body.email
    });
    return c.json(user, 201);
  } catch {
    return c.json({ error: "Failed to create user" }, 400);
  }
});

usersRoutes.get("/", async (c) => {
  const data = await usersService.getUsers();
  return c.json(data);
});

usersRoutes.get("/:userId/posts", async (c) => {
  const userId = Number(c.req.param("userId"));
  if (Number.isNaN(userId)) {
    return c.json({ error: "Invalid userId" }, 400);
  }

  const data = await usersService.getPostsByUserId(userId);
  return c.json(data);
});

export default usersRoutes;
