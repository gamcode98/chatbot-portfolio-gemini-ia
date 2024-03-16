import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { runChatbot } from '../utils'

const generateText = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const { text } = body

  const response = await runChatbot(text)

  return res.status(200).json({ response })
})

export const chatbotController = {
  generateText
}
