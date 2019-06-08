import { Injectable } from '@nestjs/common'

export interface User {
  email: string,
  roles: string[]
}

/**  
 * Defines a mechanism for validating the request session,
 * making sure the session has not expired and has been recorded in persistent storage.
 */
@Injectable()
export class SessionValidationAdapter {

  // TODO execute session validation logic, add ExecutionContext as param to retrieve request details from
  public validateRequest(): Promise<User> {
    return Promise.resolve({
      email: 'foo@bar.com',
      roles: ['ADMIN', 'USER']
    })
  }
}
