import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus/dist'
import { APP_GUARD } from '@nestjs/core'

import { ToDoModule } from './to-do'
import { TypeOrmModuleFactory } from '../shared-components/module-factories'
import { TerminusHealthCheckService } from '../shared-components/providers/healtcheck/TerminusHealthCheck.service'
import { RolesGuard } from '../shared-components/guards/RolesGuard'
import { SessionValidationAdapter } from '../shared-components/guards/SessionValidationAdapter'

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SessionValidationAdapter
  ],
})
export class AppModule {
}
