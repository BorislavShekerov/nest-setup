import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ToDoController } from './to-do.controller'

import { ToDoService } from './to-do.service'
import { TestPipelineService } from './pipeline.service'

import { ToDo } from './entities/ToDo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  controllers: [ToDoController],
  providers: [ToDoService, TestPipelineService],
})
export class ToDoModule { }


