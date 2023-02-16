import { Controller, Get, Body, Post } from '@nestjs/common';

import { WordsService } from './words.service';
import { CreateUpdateWordsDto } from './dto/create-update-words.dto';
import type { Word } from './types/words.types';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get()
  getWords(): Word[] {
    return this.wordsService.getWords();
  }

  @Post()
  addWords(@Body() updateWordsDto: CreateUpdateWordsDto): Word[] {
    return this.wordsService.addWords(updateWordsDto);
  }
}
