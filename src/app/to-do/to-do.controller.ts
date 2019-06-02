import { Controller, Get, Post, Body } from '@nestjs/common'
import { ApiImplicitBody, ApiResponse } from '@nestjs/swagger'

import { ToDoService } from './to-do.service'
import { ToDo } from './entities/ToDo.entity'
import { ToDoCreationRequest } from './requests/ToDoCreation.request'

@Controller()
export class ToDoController {

  constructor(private readonly toDoService: ToDoService) {
  }

  @Get('/to-dos')
  @ApiResponse({ status: 200, type: ToDo, isArray: true })
  getHello(): Promise<ToDo[]> {
    return this.toDoService.getAll()
  }

  @Post('/to-dos')
  @ApiImplicitBody({ name: 'ToDoCreationRequest', type: ToDoCreationRequest })
  createToDo(@Body() { name }: ToDoCreationRequest): Promise<ToDo> {
    return this.toDoService.createToDo(name)
  }
}
