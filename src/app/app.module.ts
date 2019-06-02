import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ToDoModule } from './to-do'
import { TypeOrmModuleFactory } from '../shared-components/module-factories'

@Module({
  imports: [
    ToDoModule,
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmModuleFactory.create
    }),
  ],
})
export class AppModule {
}
