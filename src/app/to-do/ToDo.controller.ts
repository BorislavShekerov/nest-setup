import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ApiImplicitBody, ApiResponse } from '@nestjs/swagger'

import { ToDoService } from './ToDo.service'
import { ToDo } from './entities/ToDo.entity'
import { ToDoRequest } from './requests/ToDo.request'
import { Roles } from '../../shared-components/decorators'

@Controller('to-dos')
export class ToDoController {

  constructor(private readonly toDoService: ToDoService) {
  }

  @Get()
  @ApiResponse({ status: 200, type: ToDo, isArray: true })
  @Roles('ADMIN')
  getToDos(@Req() request: any): Promise<ToDo[]> {
    console.log(request.user as any)
    return this.toDoService.getAll()
  }

  @Post()
  @ApiImplicitBody({ name: 'ToDoRequest', type: ToDoRequest })
  createToDo(@Body() { name }: ToDoRequest, @Req() request: any): Promise<ToDo> {
    console.log(request.user as any)
    return this.toDoService.createToDo(name)
  }

  @Patch('/:id')
  @ApiResponse({ status: 200 })
  async updateToDo(@Param('id') id: number, @Body() { name }: ToDoRequest): Promise<void> {
    await this.toDoService.updateToDo(+id, name)
  }

  @Delete('/:id')
  @ApiResponse({ status: 200 })
  deleteToDo(@Param('id') id: number): Promise<void> {
    return this.toDoService.deleteToDo(id)
  }
}
