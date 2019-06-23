import { ToDoService } from 'src/app/to-do/ToDo.service'
import * as request from 'supertest'

import { cleanDatabase, setUp } from './before-each.util'

describe('integration:ToDoController', () => {
  let app
  let toDoService: ToDoService

  beforeAll(async () => {
    const appAndFixture = await setUp()
    app = appAndFixture.app
    toDoService = appAndFixture.moduleFixture.get<ToDoService>(ToDoService)
  })

  afterEach(async () => {
    await cleanDatabase()
  })

  it('api/to-dos (GET)', async () => {
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .get('api/to-dos')
      .expect(200)
      .expect([toDo])
  })

  it('api/to-dos/1 (DELETE)', async () => {
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .delete(`api/to-dos/${toDo.id}`)
      .expect(200)
  })

  it('api/to-dos/1 (PATCH)', async () => {
    const updatedName = 'updated name'
    const toDo = await toDoService.createToDo('test to-do')

    return request(app.getHttpServer())
      .patch(`api/to-dos/${toDo.id}`)
      .send({ name: updatedName })
      .expect(200)
      .then(async () => {
        const updatedToDo = (await toDoService.getAll())[0]
        expect(updatedToDo).toEqual({ ...toDo, name: updatedName })
      })
  })

  it('api/to-dos (POST)', async () => {
    const name = 'to-do name'

    return request(app.getHttpServer())
      .post('api/to-dos')
      .send({ name })
      .expect(201)
      .then(async () => {
        const createToDo = (await toDoService.getAll())[0]
        expect(createToDo.name).toEqual(name)
      })
  })

  afterAll(async () => await app.close())
})
