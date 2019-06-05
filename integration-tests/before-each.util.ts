import { TestingModule, Test } from '@nestjs/testing'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { INestApplication } from '@nestjs/common'
import { getConnection } from 'typeorm'

import { AppModule } from '../src/app/app.module'

/**
 * Creates the test fixture, bootstrapping the root {@link AppModule}.
 * Initializes the {@link INestApplication} allowing tests to execute HTTP requests against it.
 */
export const setUp = async (): Promise<{ app: INestApplication, moduleFixture: TestingModule }> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication(new FastifyAdapter())
  await app.init()
  await app.getHttpAdapter().getInstance().ready()
  await cleanDatabase()

  return { app, moduleFixture }
}

export const cleanDatabase = (): Promise<any> => {
  const connenction = getConnection()
  return connenction.synchronize(true)
}
