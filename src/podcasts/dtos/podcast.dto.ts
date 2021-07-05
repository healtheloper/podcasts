import { Podcast } from './../entities/podcast.entity';
import { Field } from '@nestjs/graphql';
import { MutationOutput } from './../../common/dtos/output.dto';

export class PodcastOutput extends MutationOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}
