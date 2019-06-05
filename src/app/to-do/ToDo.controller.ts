import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiImplicitBody, ApiResponse } from '@nestjs/swagger'

import { ToDoService } from './ToDo.service'
import { ToDo } from './entities/ToDo.entity'
import { ToDoRequest } from './requests/ToDoCreation.request'

@Controller()
export class ToDoController {

  constructor(private readonly toDoService: ToDoService) {
  }

  @Get('/to-dos')
  @ApiResponse({ status: 200, type: ToDo, isArray: true })
  getToDos(): Promise<ToDo[]> {
    return this.toDoService.getAll()
  }

  @Post('/to-dos')
  @ApiImplicitBody({ name: 'ToDoRequest', type: ToDoRequest })
  createToDo(@Body() { name }: ToDoRequest): Promise<ToDo> {
    return this.toDoService.createToDo(name)
  }

  @Patch('/to-dos/:id')
  @ApiResponse({ status: 200 })
  async updateToDo(@Param('id') id: number, @Body() { name }: ToDoRequest): Promise<void> {
    await this.toDoService.updateToDo(+id, name)
  }

  @Delete('/to-dos/:id')
  @ApiResponse({ status: 200 })
  deleteToDo(@Param('id') id: number): Promise<void> {
    return this.toDoService.deleteToDo(id)
  }
}
