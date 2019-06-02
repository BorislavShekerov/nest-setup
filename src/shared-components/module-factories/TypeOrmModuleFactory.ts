import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigProviderFactory } from '../providers'

export class TypeOrmModuleFactory {
  static create(): TypeOrmModuleOptions {
    const { host, port, username, password, database } =
      ConfigProviderFactory.getConfigProviderForEnvironment().getDbConfig()

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: ["dist/app/**/*.entity{.ts,.js}"],
      migrations: ["dist/db-migrations/*.js"],
      synchronize: false,
      migrationsRun: true
    }
  }
}

export interface Foo {
}
