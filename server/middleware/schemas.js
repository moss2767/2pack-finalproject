import Joi from 'joi'

const schemas = {
  newQuestion: Joi.object().keys({
    question: Joi.string().required(),
    answers: Joi.required(),
    quizId: Joi.number().required()
  }),
  createQuiz: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  }),
  deleteQuiz: Joi.object().keys({
    quizId: Joi.number().required()
  })
}

export default schemas
