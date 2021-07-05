import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
