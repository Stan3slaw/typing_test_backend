import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { words } from '../mock/data';

@WebSocketGateway({ cors: true })
export class WordsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('onInputChange')
  handleEvent(@MessageBody() data: string): void {
    const currentWord = words[0];

    const isInputValid = currentWord.includes(data, 0);

    this.server.emit('onInputCheck', { isValid: isInputValid });
  }
}
