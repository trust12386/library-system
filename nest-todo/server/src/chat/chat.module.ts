import { Module } from '@nestjs/common';
import { WsJwtStrategy } from 'src/auth/strategies/ws-jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { ChatGateWay } from './chat.gateway';

@Module({
  imports: [UserModule],
  providers: [
    ChatGateWay, 
    WsJwtStrategy],
})
export class ChatModule {}
