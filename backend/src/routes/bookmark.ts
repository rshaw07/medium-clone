import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookmarkRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

bookmarkRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
  
    try {
      const user = await verify(token, c.env.JWT_SECRET);
      if (user) {
          //@ts-ignore
          c.set("userId", user.id);
          await next();
      } else {
          return c.text("Unauthorized", 403);
      }
  } catch (error) {
        return c.text("Unauthorized", 403);
    }
});

bookmarkRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  try {
    const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: id,
        }
      });
      return c.json({
        bookmarks
      })
  } catch (error) {
    return c.text("Something happended while fetching bookmarks", 411);
  }
})

bookmarkRouter.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: id,
        blogId: body.blogId
      },
    });
    return c.json({
      bookmark
    });
  } catch (error) {
    return c.text("Something happended while creating bookmark", 411);
  }
})

bookmarkRouter.delete("/:id", async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  try {
    await prisma.bookmark.deleteMany({
      where: {
        blogId: blogId,
        userId: id
      },
    });
    return c.json({
        "msg": "Bookmark deleted successfully"
    });
  } catch (error) {
    return c.text("Something happended while deleting bookmark", 411);
  }
})

export default bookmarkRouter;