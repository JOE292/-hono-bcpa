import { Hono } from "hono";
import * as commentsService from "../services/comments.service.js";

const commentsRoutes = new Hono();

commentsRoutes.post("/", async (c) => {
  const body = await c.req.json<{ postId?: number; content?: string }>();

  if (!body.postId || !body.content) {
    return c.json({ error: "postId and content are required" }, 400);
  }

  try {
    const comment = await commentsService.createComment({
      postId: body.postId,
      content: body.content
    });
    return c.json(comment, 201);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to create comment";
    return c.json({ error: msg }, 400);
  }
});

commentsRoutes.get("/", async (c) => {
  const data = await commentsService.getComments();
  return c.json(data);
});

export default commentsRoutes;
