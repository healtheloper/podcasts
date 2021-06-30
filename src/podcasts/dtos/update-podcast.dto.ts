import { InputType, PartialType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastInput extends PartialType(Podcast, InputType) {}
