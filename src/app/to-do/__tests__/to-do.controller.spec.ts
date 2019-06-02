import { Test } from '@nestjs/testing'

import { ToDoController } from '../to-do.controller'
import { ToDoService } from '../to-do.service'

describe('ToDoController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [ToDoService],
    }).compile()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('foo').toBe('foo')
    })
  })
})
