const request = require('supertest')
const app = require('../app.js')

test('CSS is appended with current app version', async () => {
  const route = app.routes.get('start')
  const response = await request(app).get(route.path.en)
  
  expect(response.text).toContain(`/dist/css/styles.css?${process.env.TAG_VERSION}`)
})

test('app.js is appended with current app version', async () => {
  const route = app.routes.get('start')
  const response = await request(app).get(route.path.en)
  
  expect(response.text).toContain(`/dist/js/app.js?${process.env.TAG_VERSION}`)
})