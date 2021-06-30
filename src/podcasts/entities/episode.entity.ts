import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field((returns) => Number)
  @IsNumber()
  id: number;
  @Field((returns) => String)
  @IsString()
  title: string;
  @Field((returns) => Number)
  @IsNumber()
  rating: number;
}
