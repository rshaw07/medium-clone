import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@coder_rishi07/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
      userId: string;
    }
  }>();

blogRouter.use("/*", async (c, next) => {
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

  blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      return c.text("Invalid inputs", 411);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    const id = c.get("userId");
    const blog = await prisma.blog.create({
      data: {
        authorId: id,
        title: body.title,
        content: body.content,
        draft: body.draft,
        tags: body.tags
      }
    })

    return c.json({
        id : blog.id
    })
  })



  blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      return c.text("Invalid inputs", 411);
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    
    const blog = await prisma.blog.update({
        where: {
          id: body.id,
          authorId: c.get("userId")
        },
        data: {
            title: body.title,
            content: body.content,
            draft: body.draft,
            image: body.image,
            tags: body.tags
      }
    })

    return c.json({
        id : blog.id
    })
  })

  blogRouter.put('/like', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    
    const blog = await prisma.blog.update({
        where: {
          id: body.id
        },
        data: {
            likes: {
                increment: 1
            }
      }
    })

    return c.json({
        likes: blog.likes
    })
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
      try{
          const blog = await prisma.blog.findMany({
              include: {
                  author: true
              }
          })
              return c.json({
                  blogs : blog
              })
      }
      catch(e){
          return c.text('Blog not found', 411);
      }
  })


  blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: id,
            },
            include: {
                author: true
            }
            })
    
            return c.json({
                blog: blog
            })
    }
    catch(e){
        return c.text('Blog not found', 411);
    }
    
  })

  blogRouter.delete('/delete/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    try{
        await prisma.blog.delete({
            where: {
                id: id,
            }
            })
        const blogs = await prisma.blog.findMany({
            include: {
                author: true
            }
            })
    
            return c.json({
                blogs: blogs
        })
    }
    catch(e){
        return c.text('Blog not found', 411);
    }
    
  })

  blogRouter.post('/bookmark', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    const id = c.get("userId");
    try{
        const bookmark = await prisma.bookmark.create({
            data: {
                userId: id,
                blogId: body.id
            }
            })
    
            return c.json({
                bookmark
            })
    }
    catch(e){
        return c.text('Blog not found', 411);
    }
    
  })

  blogRouter.delete('/bookmark/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

    try{
        await prisma.bookmark.delete({
            where: {
                id: id,
            }
            })
    
            return c.json({
                msg: "Bookmark deleted successfully"
            })
    }
    catch(e){
        return c.text('Blog not found', 411);
    }
    
  })


