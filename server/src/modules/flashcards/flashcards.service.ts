import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class FlashcardsService {
  constructor(private prisma: PrismaService) { }

  async getUserFlashcards(userId: number) {
    return {
      message: 'Flashcards service - getUserFlashcards',
      userId,
    };
  }
}
