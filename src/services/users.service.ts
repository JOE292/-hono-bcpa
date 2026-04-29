import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { posts, users } from "../db/schema.js";

type CreateUserInput = {
  name: string;
  email: string;
};

export async function createUser(input: CreateUserInput) {
  const [created] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email
    })
    .returning();

  return created;
}

export async function getUsers() {
  return db.select().from(users);
}

export async function getPostsByUserId(userId: number) {
  return db.select().from(posts).where(eq(posts.userId, userId));
}
