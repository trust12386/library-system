import { CACHE_MANAGER, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { skipJwtAuth } from 'src/auth/constants';

@ApiTags('访问量')
@skipJwtAuth()
@Controller('count')
export class CountController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async getCount() {
    const count: number = await this.cacheManager.get('count');
    return { count: count || 0 };
  }

  @Post()
  async updateCount() {
    const { count } = await this.getCount();
    await this.cacheManager.set('count', count + 1, { ttl: 0 });
    return { count: count + 1 };
  }
}
