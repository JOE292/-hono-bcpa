import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import commentsRoutes from "./routes/comments.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = new Hono();

app.get("/", (c) => c.json({ message: "Hono modular API is running" }));

app.route("/users", usersRoutes);
app.route("/posts", postsRoutes);
app.route("/comments", commentsRoutes);

const port = Number(process.env.PORT ?? 3000);

serve(
  {
    fetch: app.fetch,
    port
  },
  () => {
    console.log(`Server running on http://localhost:${port}`);
  }
);
