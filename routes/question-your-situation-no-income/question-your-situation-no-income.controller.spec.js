const request = require('supertest')
const app = require('../../app.js')

test('Can send get request no-income route ', async () => {
  const route = app.routes.get('question-your-situation-no-income')
  const response = await request(app).get(route.path.en)
  expect(response.statusCode).toBe(200)
})

test('Can send post request no-income route ', async () => {
  const route = app.routes.get('question-your-situation-no-income')
  const response = await request(app).post(route.path.en)
  expect(response.statusCode).toBe(302)
})


describe('Test redirects for no-income ', () => {
  const route = app.routes.get('question-your-situation-no-income')

  const redirects = [
    {
      dest: 'question-mortgage-payments',
      values: ['2', '3', '5']
    },
    {
      dest: 'question-gross-income',
      values: ['1', '4', '6']
    },
  ]

  redirects.map((redirect) => {
    redirect.values.map(value => {
      test(`Redirects to ${redirect.dest} with a post value of ${value} `, async () => {
        const dest = app.routes.get(redirect.dest)

        await request(app).post(route.path.en).send({
          no_income: value,
        })
        .expect(302)
        .then(response => {
          expect(response.headers.location).toBe(dest.path.en)
        })
      })
    })
  })
}) 