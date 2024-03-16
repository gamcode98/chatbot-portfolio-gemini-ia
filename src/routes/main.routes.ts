import { Router, Application } from 'express'
import { chatbotRouter } from './chatbot.routes'

export const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/chatbot', chatbotRouter)
}
