import { Module } from '@nestjs/common';
import { PodcastsModule } from './podcasts/podcasts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
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
