import { getTasks } from '@/controllers/task/get-tasks'
import { registerTask } from '@/controllers/task/register'
import { getUserProfile } from '@/controllers/user/get-user-profile'
import { registerUser } from '@/controllers/user/register'
import { profile } from '../controllers/user/authenticate-user'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { updateTasks } from '@/controllers/task/update'
import { deleteTask } from '@/controllers/task/delete'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', registerUser)
  app.post('/authenticate', getUserProfile)
  app.post('/me', { onRequest: [verifyJWT] }, profile)

  app.get('/tasks/:user_id', getTasks)
  app.post('/task/:user_id', registerTask)
  app.put('/update_task/:user_id/:id', updateTasks)
  app.delete('/delete_task/:user_id/:id', deleteTask)
}
