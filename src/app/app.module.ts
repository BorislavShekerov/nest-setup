import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus'

import { ToDoModule } from './to-do'
import { TypeOrmModuleFactory } from '../shared-components/module-factories'
import { TerminusHealthCheckService } from '../shared-components/providers/healtcheck/TerminusHealthCheck.service'

@Module({
  imports: [
    ToDoModule,
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmModuleFactory.create
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusHealthCheckService,
    }),
  ],
})
export class AppModule {
}
