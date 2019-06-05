import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigSourceFactory } from '../providers'

export class TypeOrmModuleFactory {
  static create(): TypeOrmModuleOptions {
    const { host, port, username, password, database, customEntitiesLocation, customMigrationsLocation } =
      ConfigSourceFactory.getConfigSourceForEnvironment().getDbConfig()

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [customEntitiesLocation || 'dist/src/app/**/*.entity{.ts,.js}'],
      migrations: [customMigrationsLocation || 'dist/src/db-migrations/*.js'],
      synchronize: false,
      migrationsRun: true
    }
  }
}
