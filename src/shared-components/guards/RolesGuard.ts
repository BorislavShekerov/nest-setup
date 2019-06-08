import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RequestValidationAdapter, User } from './RequestValidationAdapter'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly requestValidationAdapter: RequestValidationAdapter
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    // TODO pass in context when proper validation logic is implemented
    const user = await this.requestValidationAdapter.validateRequest()
    return user && this.hasRole(user, roles)
  }

  private hasRole(user: User, roles: string[]): boolean {
    return user.roles.some((role) => roles.includes(role))
  }
}
