import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './routes/routes'
export const app = fastify()
app.register(appRoutes)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCors)
app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: 'Credenciais invalidas.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return res.status(500).send({ message: 'Internal server error.' })
})
