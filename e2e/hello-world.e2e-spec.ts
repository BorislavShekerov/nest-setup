import * as request from 'supertest'

import { setUp } from './before-each.util'

describe('ToDoController (e2e)', () => {
  let app

  beforeEach(async () => {
    app = await setUp()
  })

  it('/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('Hello World!')
  })
})
