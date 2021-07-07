import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
class UpdatePodcastPayload extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating']),
  InputType,
) {}

@InputType()
export class UpdatePodcastInput extends PickType(Podcast, ['id'], InputType) {
  @Field((types) => UpdatePodcastPayload)
  payload: UpdatePodcastPayload;
}
