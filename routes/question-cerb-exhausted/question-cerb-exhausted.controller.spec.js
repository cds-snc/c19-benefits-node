const request = require('supertest')
const app = require('../../app.js')

test('Can send get request cerb-exhausted route ', async () => {
  const route = app.routes.get('question-cerb-exhausted')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request cerb-exhausted route ', async () => {
  const route = app.routes.get('question-cerb-exhausted')
  const response = await request(app).post(route.path.en)
  expect(response.statusCode).toBe(302)
})

test('Redirects to mortgage-payments ', async () => {
  const route = app.routes.get('question-cerb-exhausted')
  const dest = app.routes.get('question-mortgage-payments')

  await request(app).post(route.path.en).send({
      cerb_exhausted: 'cerb-exhausted-yes',
  })
  .expect(302)
  .then(response => {
    expect(response.headers.location).toBe(dest.path.en)
  })
})
