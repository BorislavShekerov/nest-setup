import * as FastifyCookie from 'fastify-cookie'

import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app/app.module'
import {
    CustomLogger, GlobalPipeConfigurator, SecurityConfigurator, SwaggerConfigurator
} from './config'

const APP_CONFIGURATORS = [
  new SecurityConfigurator(),
  new SwaggerConfigurator(),
  new GlobalPipeConfigurator(),
]

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter()
  fastifyAdapter.register(FastifyCookie)

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new CustomLogger(),
    },
  )
  APP_CONFIGURATORS.forEach(configurator => configurator.configure(app))

  await app.listen(3030)
}

bootstrap()
