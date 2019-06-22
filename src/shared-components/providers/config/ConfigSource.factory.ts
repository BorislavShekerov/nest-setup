import { Environment } from 'src/shared-components/models'

import { ConfigSource, DeployedEnvironmentConfigSource, LocalDevConfigSource } from './source'
import { LocalTestConfigSource } from './source/LocalTestConfigSource'

/** A mechanism for retrieving the right {@link ConfigSource} to use based on the current runtime environment. */
export class ConfigSourceFactory {
  static getConfigSourceForEnvironment(): ConfigSource {
    if (process.env.ENV === Environment.development) {
      return new LocalDevConfigSource()
    } else if (process.env.ENV === 'TEST') {
      return new LocalTestConfigSource()
    }

    return new DeployedEnvironmentConfigSource()
  }
}
