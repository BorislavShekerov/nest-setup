import { Test, TestingModule } from '@nestjs/testing'

import { ToDoController } from '../to-do.controller'
import { ToDoService } from '../to-do.service'

describe('ToDoController', () => {
  let ToDoController: ToDoController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [ToDoService],
    }).compile()

    ToDoController = app.get<ToDoController>(ToDoController)
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ToDoController.getHello()).toBe('Hello World!')
    });
  });
});
