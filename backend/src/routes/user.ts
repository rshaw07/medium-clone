import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@coder_rishi07/medium-common'

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
      userId: string
    }
  }>();

  
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      return c.text("Invalid inputs", 411);
    }
    if(await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })){
      return c.text('User already exists', 404);
    }
  
    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    })
    const token = await sign({ id: response.id }, c.env.JWT_SECRET);
    return c.json({
      "jwt": token
    })
  });


  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.text("Invalid inputs", 411);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const response = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      },
    })
  
    if(!response){
      return c.text('User not found', 404);
    }
  
    const token = await sign({ id: response.id }, c.env.JWT_SECRET);
    return c.json({
      "jwt": token
    });
  });
  
  userRouter.use("/*", async (c, next) => {
   const header = c.req.header("Authorization") || "";
   const token = header.split(" ")[1];
 
   try {
     const user = await verify(token, c.env.JWT_SECRET);
     if (user) {
         //@ts-ignore
         c.set("userId", user.id);
         await next();
     } else {
         return c.text("User not found", 411);
     }
 } catch (error) {
       return c.text("Unauthorized", 403);
   }
 });

  userRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
      try{
        const user = await prisma.user.update({
          where: {
            // @ts-ignore
            id: c.get("userId")
          },
          data: {
            name: body.name,
            bio: body.bio,
            avatar: body.avatar,
            password: body.password
          }
        })
        return c.json({
            user
        })
      }
      catch(e){
          return c.text('User not found', 411);
      }
  })
  
  userRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
      try{
        // @ts-ignore
        const id = c.get("userId");
          const user = await prisma.user.findMany({})
              return c.json({
                  users: user,
                  userId: id
              })
      }
      catch(e){
          return c.text('User not found', 411);
      }
  })

  userRouter.delete('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
      try{
        const user = await prisma.user.delete({
          where: {
            // @ts-ignore
            id: id
          }
        })
        return c.json({
            user
        })
      }
      catch(e){
          return c.text('User not found', 411);
      }
  })

 