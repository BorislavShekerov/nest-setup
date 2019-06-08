import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TerminusModule } from '@nestjs/terminus'
import { APP_GUARD } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'

import { ToDoModule } from './to-do'
import { TypeOrmModuleFactory } from '../shared-components/module-factories'
import { TerminusHealthCheckService } from '../shared-components/providers/healtcheck/TerminusHealthCheck.service'
import { RolesGuard } from '../shared-components/guards/RolesGuard'
import { RequestValidationAdapter } from '../shared-components/guards/RequestValidationAdapter'

@Module({
  imports: [
    ToDoModule,
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmModuleFactory.create
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusHealthCheckService,
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    RequestValidationAdapter
  ],
})
export class AppModule {
}
