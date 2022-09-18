import { UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsJwtAuthGuard } from 'src/auth/guards/ws-jwt-auth.guard';
import { MessageData } from './chat.interface';

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateWay {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData,
  ): Promise<MessageData> {
    console.log('客户消息: ', clientData.content);
    return { content: '你好，很高兴为你服务' };
  }

  @UseGuards(WsJwtAuthGuard)
  @Cron(CronExpression.EVERY_10_SECONDS)
  async sayHi() {
    this.server.emit('serverToClient', { content: '你还在吗?' });
  }
}
