import {
    Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req
} from '@nestjs/common'
import { ApiImplicitBody, ApiResponse } from '@nestjs/swagger'

import { Roles } from '../../shared-components/decorators'
import { ToDo } from './entities/ToDo.entity'
import { ToDoRequest } from './requests/ToDo.request'
import { ToDoService } from './ToDo.service'

@Controller('api/to-dos')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get()
  @ApiResponse({ status: 200, type: ToDo, isArray: true })
  @Roles('ADMIN')
  getToDos(@Req() request: any): Promise<ToDo[]> {
    console.log(request.user as any)
    return this.toDoService.getAll()
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: ToDo, isArray: true })
  async getToDo(@Param('id') todoId: string): Promise<ToDo> {
    const toDos = await this.toDoService.getAll()

    return toDos.find(({ id }) => id === +todoId)!
  }

  @Post()
  @ApiImplicitBody({ name: 'ToDoRequest', type: ToDoRequest })
  createToDo(@Body() { name }: ToDoRequest, @Req() request: any): Promise<ToDo> {
    console.log(request.user as any)
    return this.toDoService.createToDo(name)
  }

  @Patch('/:id')
  @ApiResponse({ status: 200 })
  async updateToDo(@Param('id') id: string, @Body() { name }: ToDoRequest): Promise<void> {
    await this.toDoService.updateToDo(+id, name)
  }

  @Delete('/:id')
  @ApiResponse({ status: 200 })
  deleteToDo(@Param('id') id: number): Promise<void> {
    return this.toDoService.deleteToDo(id)
  }
}
