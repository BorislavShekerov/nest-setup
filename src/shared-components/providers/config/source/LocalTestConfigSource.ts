import { DbConfig, LogLevel } from '../../../models'
import { ConfigSource } from './ConfigSource'

export class LocalTestConfigSource implements ConfigSource {
  public getDbConfig(): DbConfig {
    return {
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '',
      database: 'db_test',
      customEntitiesLocation: 'src/app/**/*.entity{.ts,.js}',
      customMigrationsLocation: 'src/db-migrations/*.js'
    }
  }

  public getUserInterfaceDomain(): string {
    return 'http://localhost:1234'
  }

  public getLogLevel(): LogLevel {
    return LogLevel.debug
  }
}
