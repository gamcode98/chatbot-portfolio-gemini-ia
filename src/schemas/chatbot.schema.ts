import Joi from 'joi'

const text = Joi.string()

const generateTextSchema = Joi.object({
  text: text.required()
})

export {
  generateTextSchema
}
