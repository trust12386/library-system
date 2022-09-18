import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { skipJwtAuth } from 'src/auth/constants';
import { QuotoDto } from './dto/quoto.dto';

const randomQuoteApi = 'http://api.quotable.io/random';

@ApiTags('名言名句')
@skipJwtAuth()
@Controller('quote')
export class QuoteController {
  constructor(private httpServer: HttpService) {}

  @ApiResponse({ type: QuotoDto })
  @Get('random')
  async getRandomQuote() {
    const response$ = this.httpServer.get(randomQuoteApi);
    const response = await lastValueFrom(response$);
    return response.data;
  }
}
