import validate from 'validate.js'

test('simple test', () => {
  
  // given
  const constraints = {
    foo: {
      presence: true,
      type: 'string',
      length: { 
        minimum: 6,
        message: '%{value} must have length of 6'
      }
    }
  }

  // when
  const error = validate({ foo: 1 }, constraints)

  // then
  expect(error).toBeDefined()
})