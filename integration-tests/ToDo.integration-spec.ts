import * as request from 'supertest'

import { setUp, tearDown } from './before-each.util'
import { ToDoService } from 'src/app/to-do/ToDo.service'

describe('integration:ToDoController', () => {
  let app
  let toDoService: ToDoService

  beforeAll(async () => {
    const appAndFixture = await setUp()
    app = appAndFixture.app
    toDoService = appAndFixture.moduleFixture.get<ToDoService>(ToDoService)

    await tearDown()
  })

  afterEach(async () => await tearDown())

  it('/to-dos (GET)', async () => {
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .get('/to-dos')
      .expect(200)
      .expect([toDo])
  })

  it('/to-dos/1 (DELETE)', async () => {
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .delete(`/to-dos/${toDo.id}`)
      .expect(200)
  })

  it('/to-dos/1 (PATCH)', async () => {
    const updatedName = 'updated name'
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .patch(`/to-dos/${toDo.id}`)
      .send({ name: updatedName })
      .expect(200)
      .then(async () => {
        const updatedToDo = (await toDoService.getAll())[0]
        expect(updatedToDo).toEqual({ ...toDo, name: updatedName })
      })
  })

  it('/to-dos (POST)', async () => {
    const name = 'to-do name'

    return request(app.getHttpServer())
      .post('/to-dos')
      .send({ name })
      .expect(201)
      .then(async () => {
        const createToDo = (await toDoService.getAll())[0]
        expect(createToDo.name).toEqual(name)
      })
  })
})
