import { Injectable } from '@nestjs/common'

export interface User {
  email: string,
  roles: string[]
}

@Injectable()
export class RequestValidationAdapter {

  // TODO execute session validation logic
  public validateRequest(): Promise<User> {
    return Promise.resolve({
      email: 'foo@bar.com',
      roles: ['ADMIN', 'USER']
    })
  }
}
