import { Episode } from './podcasts/entities/episode.entity';
import { Module } from '@nestjs/common';
import { PodcastsModule } from './podcasts/podcasts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './podcasts/entities/podcast.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    PodcastsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
