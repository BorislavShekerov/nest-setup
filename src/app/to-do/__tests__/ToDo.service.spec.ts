import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { ToDoService } from '../ToDo.service'
import { ToDo } from '../entities/ToDo.entity'

describe('ToDoService', () => {
  let toDoService: ToDoService
  const toDoRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    find: jest.fn()
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ToDoService,
        {
          provide: getRepositoryToken(ToDo),
          useValue: toDoRepository,
        },
      ],
    }).compile()

    toDoService = module.get<ToDoService>(ToDoService)
  })

  it('should persist instance when creating', async () => {
    const toDoName = 'foo'
    const createdToDo: ToDo = { id: 1, name: toDoName }

    jest.spyOn(toDoRepository, 'save').mockImplementation(() => Promise.resolve(createdToDo))

    const result = await toDoService.createToDo(toDoName)
    expect(result).toEqual(createdToDo)
    expect(toDoRepository.save).toHaveBeenCalledWith({ name: toDoName })
  })

  it('should delete to-do entity', async () => {
    jest.spyOn(toDoRepository, 'delete').mockImplementation(() => Promise.resolve({ affected: 1 }))

    await toDoService.deleteToDo(1)
  })

  it('should throw NotFoundException if affected entities is 0', async () => {
    jest.spyOn(toDoRepository, 'delete').mockImplementation(() => Promise.resolve({ affected: 0 }))
    const toDoId = 1

    try {
      await toDoService.deleteToDo(toDoId)
    } catch ({ message }) {
      expect(message.message).toEqual(`To-do with id ${toDoId} not found`)
    }
  })

  it('should update entity', async () => {
    jest.spyOn(toDoRepository, 'update').mockImplementation(() => Promise.resolve())
    const toDoId = 1
    const updatedName = 'new name'

    await toDoService.updateToDo(toDoId, updatedName)
    expect(toDoRepository.update).toHaveBeenCalledWith(toDoId, { name: updatedName })
  })

  it('should retrieve all todos from repository', async () => {
    const toDos = [{ id: 1, name: 'to do ' }]
    jest.spyOn(toDoRepository, 'find').mockImplementation(() => Promise.resolve(toDos))

    const result = await toDoService.getAll()
    expect(result).toEqual(toDos)
  })
})
