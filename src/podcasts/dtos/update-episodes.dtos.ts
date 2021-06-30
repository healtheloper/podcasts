import { Episode } from '../entities/episode.entity';
import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateEpisodesInput extends PartialType(Episode, InputType) {}

@ObjectType()
export class UpdateEpisodesOutput extends MutationOutput {}
