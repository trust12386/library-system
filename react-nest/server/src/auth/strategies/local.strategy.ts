import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ReportLogger } from 'src/log/ReportLogger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private moduleRef: ModuleRef,
    private reportLogger: ReportLogger,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
    this.reportLogger.setContext('LocalStrategy');
  }

  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const contextId = ContextIdFactory.getByRequest(request);

    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const user = await authService.validateUser(username, password);

    if (!user) {
      this.reportLogger.error('无法登录');
      throw new UnauthorizedException();
    }

    return user;
  }
}
