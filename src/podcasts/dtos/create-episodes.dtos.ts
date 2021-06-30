import { Episode } from '../entities/episode.entity';
import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateEpisodesInput extends PartialType(Episode, InputType) {}

@ObjectType()
export class CreateEpisodesOutput extends MutationOutput {}
