import * as yup from 'yup'

test('yup simple test', () => {

  // given
  const schema = yup.object().shape({
    hostname: yup.string().url().label('foo').required(),
    username: yup.string().default(''),
    password: yup.string().default(''),
    admin: yup.boolean().default(false),
    labels: yup.array().of(yup.object().shape({
      id: yup.number().integer(),
      label: yup.string()
    })).default([])
  })

  // when
  let value, error
  try {
    value = schema.validateSync({ 
      hostname: 'https://foo.fo' 
    })
  } catch(err) {
    error = err
  }

  // then
  expect(error).not.toBeDefined()
  
  expect(value).toEqual(expect.objectContaining({
    hostname: expect.any(String),
    username: expect.any(String),
    password: expect.any(String),
    admin: expect.any(Boolean),
    labels: expect.any(Array),
  }))

  expect(schema.describe()).toEqual(expect.objectContaining({
    type: 'object',
    fields: expect.any(Object)
  }))
})