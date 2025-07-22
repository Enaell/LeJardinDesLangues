import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FlashcardsService } from './flashcards.service';
import { Request } from 'express';

@ApiTags('Flashcards')
@Controller('flashcards')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) { }

  @Get()
  @ApiOperation({ summary: 'Obtenir ses flashcards' })
  async getMyFlashcards(@Req() req: Request) {
    const user = req.user as any;
    return this.flashcardsService.getUserFlashcards(user.id);
  }
}
