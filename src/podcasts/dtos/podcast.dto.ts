import { Podcast } from './../entities/podcast.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MutationOutput } from './../../common/dtos/output.dto';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class PodcastsOutput extends MutationOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}
@ObjectType()
export class PodcastOutput extends MutationOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}
@ObjectType()
export class EpisodesOutput extends MutationOutput {
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}
@ObjectType()
export class EpisodeOutput extends MutationOutput {
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;
}
