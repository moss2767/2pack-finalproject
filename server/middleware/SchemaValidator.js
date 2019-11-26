import Joi from 'joi'

const SchemaValidator = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema)
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map(i => i.message).join(',')
      res.status(400).json({
        message: 'Invalid request body',
        error: message
      })
    }
  }
}

export default SchemaValidator
