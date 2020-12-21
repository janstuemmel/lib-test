import Joi from 'joi'

test('simple test', () => {

  // given
  const schema = Joi.object({
    hostname: Joi.string().uri().description('foo').required(),
    username: Joi.string().default(''),
    password: Joi.string().default(''),
    admin: Joi.boolean().default(false),
    labels: Joi.array().items(Joi.object({
      id: Joi.number().integer(),
      label: Joi.string()
    })).default([])
  })

  // when
  const { error, value } = schema.validate({ 
    hostname: 'https://foo' 
  })

  // then
  expect(error).not.toBeDefined()
  
  expect(value).toEqual(expect.objectContaining({
    hostname: expect.any(String),
    username: expect.any(String),
    password: expect.any(String),
    admin: expect.any(Boolean),
    labels: expect.any(Array),
  }))
  
  expect(schema.describe()).toEqual({
    type: 'object',
    keys: expect.any(Object)
  })
})