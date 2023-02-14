import { Injectable } from '@nestjs/common';

import type { CreateUpdateWordsDto } from './dto/create-update-words.dto';
import { words } from './mock/data';

@Injectable()
export class WordsService {
  getWords = (): string[] => {
    return words;
  };

  addWords = (updateWordsDto: CreateUpdateWordsDto): string[] => {
    words.push(...updateWordsDto.words);

    return words;
  };
}
