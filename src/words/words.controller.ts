import { Controller, Get } from '@nestjs/common';

import { WordsService } from './words.service';
import type { Word } from './types/words.types';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get()
  getWords(): Word[] {
    return this.wordsService.getWords();
  }
}
