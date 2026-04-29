import { Hono } from "hono";
import * as postsService from "../services/posts.service.js";

const postsRoutes = new Hono();

postsRoutes.post("/", async (c) => {
  const body = await c.req.json<{ userId?: number; title?: string; body?: string }>();

  if (!body.userId || !body.title || !body.body) {
    return c.json({ error: "userId, title and body are required" }, 400);
  }

  try {
    const post = await postsService.createPost({
      userId: body.userId,
      title: body.title,
      body: body.body
    });
    return c.json(post, 201);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to create post";
    return c.json({ error: msg }, 400);
  }
});

postsRoutes.get("/", async (c) => {
  const data = await postsService.getPosts();
  return c.json(data);
});

postsRoutes.get("/:postId/comments", async (c) => {
  const postId = Number(c.req.param("postId"));
  if (Number.isNaN(postId)) {
    return c.json({ error: "Invalid postId" }, 400);
  }

  const data = await postsService.getCommentsByPostId(postId);
  return c.json(data);
});

export default postsRoutes;
