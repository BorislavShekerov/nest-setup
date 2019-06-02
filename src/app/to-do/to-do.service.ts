import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ToDo } from './entities/ToDo.entity'

@Injectable()
export class ToDoService {

  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>) {
  }

  createToDo(name: string): Promise<ToDo> {
    return this.toDoRepository.save({ name })
  }

  getAll(): Promise<ToDo[]> {
    return this.toDoRepository.find()
  }
}
