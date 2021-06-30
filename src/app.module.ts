import { Module } from '@nestjs/common';
import { PodcastsModule } from './podcasts/podcasts.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    PodcastsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
