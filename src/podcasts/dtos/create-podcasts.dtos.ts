import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastsInput extends PickType(
  Podcast,
  ['title', 'category'],
  InputType,
) {}

@ObjectType()
export class CreatePodcastsOutput extends MutationOutput {
  @Field((types) => Number, { nullable: true })
  id?: number;
}
