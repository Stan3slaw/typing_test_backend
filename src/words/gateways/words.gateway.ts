import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { words } from '../mock/data';
import { WordsService } from '../words.service';

@WebSocketGateway({ cors: true })
export class WordsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  private currentWordIndex = 0;
  private shuffledWords: string[];

  @WebSocketServer()
  server: Server;

  handleConnection(): void {
    this.shuffledWords = WordsService.shuffleWords(words);
  }

  handleDisconnect(): void {
    this.currentWordIndex = 0;
  }

  @SubscribeMessage('onInputChange')
  handleChangeEvent(@MessageBody() data: string): void {
    const currentWord = this.shuffledWords[this.currentWordIndex];
    const isInputValid = currentWord.search(new RegExp(`\\b${data}`)) !== -1;

    this.server.emit('onInputCheck', { isValid: isInputValid });
  }

  @SubscribeMessage('onInputSubmit')
  handleSubmitEvent(): void {
    this.currentWordIndex += 1;
    this.server.emit('getCurrentWordIndex', this.currentWordIndex);
  }

  @SubscribeMessage('loadMoreWords')
  handleLoadMoreWordsEvent(): void {
    this.shuffledWords.splice(0, 9);
    this.currentWordIndex = 0;
    this.server.emit('getWords', WordsService.toWordsResponse(this.shuffledWords));
    this.server.emit('getCurrentWordIndex', this.currentWordIndex);
  }

  @SubscribeMessage('refreshWords')
  handleRefreshWordsEvent(): void {
    this.currentWordIndex = 0;
    this.shuffledWords = WordsService.shuffleWords(words);
    this.server.emit('getWords', WordsService.toWordsResponse(this.shuffledWords));
    this.server.emit('getCurrentWordIndex', this.currentWordIndex);
  }
}
