import { Controller, Get, Body, Post } from '@nestjs/common';

import { WordsService } from './words.service';
import { CreateUpdateWordsDto } from './dto/create-update-words.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get()
  getWords(): string[] {
    return this.wordsService.getWords();
  }

  @Post()
  addWords(@Body() createUpdateWordsDto: CreateUpdateWordsDto): string[] {
    return this.wordsService.addWords(createUpdateWordsDto);
  }
}
