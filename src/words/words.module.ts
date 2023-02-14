import { Module } from '@nestjs/common';

import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { WordsGateway } from './gateways/words.gateway';

@Module({
  controllers: [WordsController],
  providers: [WordsService, WordsGateway],
})
export class WordsModule {}
