/** The list of all environments that the app could run in. */
export enum Environment {
  /** The local development environment. */
  development = 'dev',
  /** The test execution environment, used when tests are executed locally or by the CI. */
  test = 'dev',

  integration = 'integration',
  uat = 'uat',
  prod = 'production',
}
