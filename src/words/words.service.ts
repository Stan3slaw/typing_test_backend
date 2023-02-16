import { Injectable } from '@nestjs/common';

import type { CreateUpdateWordsDto } from './dto/create-update-words.dto';
import { words } from './mock/data';
import type { Word } from './types/words.types';

@Injectable()
export class WordsService {
  static toWordsResponse = (words: string[]): Word[] => {
    const wordsResponse = words.map((word) => ({
      word,
      isValid: true,
    }));

    return wordsResponse;
  };

  static shuffleWords = (words: string[]): string[] => {
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }

    return words;
  };

  getWords = (): Word[] => {
    return WordsService.toWordsResponse(words);
  };

  addWords = (updateWordsDto: CreateUpdateWordsDto): Word[] => {
    words.push(...updateWordsDto.words);

    return WordsService.toWordsResponse(words);
  };
}
