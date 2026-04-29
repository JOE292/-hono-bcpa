import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { comments, posts, users } from "../db/schema.js";

type CreatePostInput = {
  userId: number;
  title: string;
  body: string;
};

export async function createPost(input: CreatePostInput) {
  const owner = await db.select().from(users).where(eq(users.id, input.userId));
  if (owner.length === 0) {
    throw new Error("User not found");
  }

  const [created] = await db
    .insert(posts)
    .values({
      userId: input.userId,
      title: input.title,
      body: input.body
    })
    .returning();

  return created;
}

export async function getPosts() {
  return db.select().from(posts);
}

export async function getCommentsByPostId(postId: number) {
  return db.select().from(comments).where(eq(comments.postId, postId));
}
