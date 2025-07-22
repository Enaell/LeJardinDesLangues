import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DictionaryService } from './dictionary.service';

@ApiTags('Dictionnaire')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) { }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher des mots dans le dictionnaire' })
  async searchWords(
    @Query('q') query: string,
    @Query('lang') languageCode: string,
  ) {
    return this.dictionaryService.findWords(query, languageCode);
  }
}
