import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ToDoController } from './ToDo.controller'
import { ToDoService } from './ToDo.service'
import { ToDo } from './entities/ToDo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule { }
