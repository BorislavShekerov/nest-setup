import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { TerminusModule } from '@nestjs/terminus/dist'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RolesGuard } from '../shared-components/guards/RolesGuard'
import { SessionValidationAdapter } from '../shared-components/guards/SessionValidationAdapter'
import { TypeOrmModuleFactory } from '../shared-components/module-factories'
import {
    TerminusHealthCheckService
} from '../shared-components/providers/healtcheck/TerminusHealthCheck.service'
import {
    MONITORING_SERVICE, MonitoringRequestInterceptor, MonitoringServiceFactory
} from '../shared-components/providers/monitoring'
import { ToDoModule } from './to-do'

@Module({
  imports: [
    ToDoModule,
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmModuleFactory.create,
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
    {
      provide: MONITORING_SERVICE,
      useValue: MonitoringServiceFactory.getMonitoringServiceForEnvironment(),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MonitoringRequestInterceptor,
    },
    SessionValidationAdapter,
  ],
})
export class AppModule {}
