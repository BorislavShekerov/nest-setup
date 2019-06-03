import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { SwaggerConfigurator, SecurityConfigurator, CustomLogger } from './config'
import { AppModule } from './app/app.module'

const APP_CONFIGURATORS = [
  new SecurityConfigurator(),
  new SwaggerConfigurator()
]

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new CustomLogger(),
    }
  )
  APP_CONFIGURATORS.forEach(configurator => configurator.configure(app))

  await app.listen(3000)
}

bootstrap()
