import * as Joi from '@hapi/joi'

import { DbConfig } from './ConfigProvider.model'

/** A mechanism for providing environment-specific configuration properties. */
export interface ConfigProvider {

  /** Retrieves the {@link DbConfig} based on the current environment. */
  getDbConfig(): DbConfig
}

export class LocalConfigProvider implements ConfigProvider {
  public getDbConfig(): DbConfig {
    return {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'db'
    }
  }
}

export class DeployedEnvironmentConfigProvider implements ConfigProvider {
  public getDbConfig(): DbConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      host: Joi.string(),
      port: Joi.number(),
      username: Joi.string(),
      password: Joi.string(),
      database: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      },
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    return validatedEnvConfig
  }
}
