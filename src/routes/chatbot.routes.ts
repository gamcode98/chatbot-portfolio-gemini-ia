import { Router } from 'express'
import { chatbotController } from '../controllers'
import { validatorHandler } from '../middlewares'
import { generateTextSchema } from '../schemas'

export const chatbotRouter = Router()

chatbotRouter.post(
  '/generate',
  validatorHandler(generateTextSchema, 'body'),
  chatbotController.generateText
)
