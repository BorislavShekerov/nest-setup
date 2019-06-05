import { Test } from '@nestjs/testing'

import { ToDoController } from '../ToDo.controller'
import { ToDoService } from '../ToDo.service'

describe('ToDoController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [{
        provide: ToDoService,
        useValue: {}
      }],
    }).compile()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('foo').toBe('foo')
    })
  })
})
