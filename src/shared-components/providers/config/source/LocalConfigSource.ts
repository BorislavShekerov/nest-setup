import { DbConfig, LogLevel } from '../../../models'
import { ConfigSource } from './ConfigSource'

export class LocalConfigSource implements ConfigSource {
  public getDbConfig(): DbConfig {
    return {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'db',
      customEntitiesLocation: process.env.ENV === 'TEST' ? 'src/app/**/*.entity{.ts,.js}' : null,
      customMigrationsLocation: process.env.ENV === 'TEST' ? 'src/db-migrations/*.js' : null
    }
  }

  public getUserInterfaceDomain(): string {
    return 'http://localhost:1234'
  }

  public getLogLevel(): LogLevel {
    return LogLevel.debug
  }
}
