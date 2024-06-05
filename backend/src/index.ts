import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
import bookmarkRouter from './routes/bookmark';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();
app.use('/api/*', cors())
app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);
app.route('api/v1/bookmark', bookmarkRouter);



export default app
