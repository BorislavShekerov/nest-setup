import { TestingModule, Test } from '@nestjs/testing'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { INestApplication } from '@nestjs/common'

import { AppModule } from 'app/app.module'

/**
 * Creates the test fixture, bootstrapping the root {@link AppModule}.
 * Initializes the {@link INestApplication} allowing tests to execute HTTP requests against it.
 */
export const setUp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication(new FastifyAdapter())
  await app.init()
  await app.getHttpAdapter().getInstance().ready()

  return app
}
