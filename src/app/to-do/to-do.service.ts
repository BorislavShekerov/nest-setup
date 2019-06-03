import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ToDo } from './entities/ToDo.entity'

@Injectable()
export class ToDoService {
  private logger = new Logger('ToDoService')

  constructor(
    @InjectRepository(ToDo)
    private readonly toDoRepository: Repository<ToDo>) {
  }

  createToDo(name: string): Promise<ToDo> {
    this.logger.log(`Creating to-do with name: ${name}`)
    return this.toDoRepository.save({ name })
  }

  async deleteToDo(id: number): Promise<void> {
    const { affected } = await this.toDoRepository.delete(id)

    if (affected !== 1) {
      this.logger.warn(`Unable to delete to-do with id: ${id}`)
      throw new NotFoundException(`To-do with id ${id} not found`)
    }

    this.logger.log(`Successfully deleted to-do: ${id}`)
  }

  getAll(): Promise<ToDo[]> {
    return this.toDoRepository.find()
  }

  async updateToDo(id: number, name: string): Promise<void> {
    await this.toDoRepository.update(id, { name })
  }

}
