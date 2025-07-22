import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class DictionaryService {
  constructor(private prisma: PrismaService) { }

  // Service basique pour le moment
  async findWords(query: string, languageCode: string) {
    // Implémentation à venir
    return {
      message: 'Dictionary service - findWords',
      query,
      languageCode,
    };
  }
}
