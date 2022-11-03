import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000'
  }
})
export class AppGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('content')
  handleMessage(@MessageBody() message: string): void {
    console.log(message)
    this.server.emit('content', message)
  }
}
