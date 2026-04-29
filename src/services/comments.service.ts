import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { comments, posts } from "../db/schema.js";

type CreateCommentInput = {
  postId: number;
  content: string;
};

export async function createComment(input: CreateCommentInput) {
  const targetPost = await db.select().from(posts).where(eq(posts.id, input.postId));
  if (targetPost.length === 0) {
    throw new Error("Post not found");
  }

  const [created] = await db
    .insert(comments)
    .values({
      postId: input.postId,
      content: input.content
    })
    .returning();

  return created;
}

export async function getComments() {
  return db.select().from(comments);
}
