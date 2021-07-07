import { Episode } from '../entities/episode.entity';
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { MutationOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateEpisodesInput extends PickType(
  Episode,
  ['title'],
  InputType,
) {}

@ObjectType()
export class CreateEpisodesOutput extends MutationOutput {
  @Field((types) => Number, { nullable: true })
  id?: Number;
}
