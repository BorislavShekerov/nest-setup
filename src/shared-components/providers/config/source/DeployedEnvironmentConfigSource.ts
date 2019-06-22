import * as Joi from '@hapi/joi'

import { DbConfig, LogLevel } from '../../../models'
import { ConfigSource } from './ConfigSource'

export class DeployedEnvironmentConfigSource implements ConfigSource {
  public getDbConfig(): DbConfig {
    return this.validateConfig<DbConfig>(
      Joi.object({
        host: Joi.string(),
        port: Joi.number(),
        username: Joi.string(),
        password: Joi.string(),
        database: Joi.string(),
      }),
      {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    )
  }

  public getUserInterfaceDomain(): string {
    return this.validateConfig<{ domain: string }>(
      Joi.object({
        domain: Joi.string(),
      }),
      {
        domain: process.env.UI_DOMAIN,
      },
    ).domain
  }

  public getLogLevel(): LogLevel {
    return this.validateConfig<{ logLevel: LogLevel }>(
      Joi.object({
        logLevel: Joi.string(),
      }),
      {
        logLevel: process.env.LOG_LEVEL,
      },
    ).logLevel
  }

  private validateConfig<T>(schema: Joi.ObjectSchema, config: Record<string, string | number | undefined>): T {
    const { error, value: validatedEnvConfig } = Joi.validate(config, schema)

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    return validatedEnvConfig
  }
}
