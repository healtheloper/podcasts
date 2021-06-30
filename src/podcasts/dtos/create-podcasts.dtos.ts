import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastsInput extends PartialType(Podcast, InputType) {}

@ObjectType()
export class CreatePodcastsOutput extends MutationOutput {}
