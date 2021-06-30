import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Episode } from './episode.entity';

@ObjectType()
export class Podcast {
  @Field((returns) => Number)
  @IsNumber()
  id: number;

  @Field((returns) => String)
  @IsString()
  title: string;

  @Field((returns) => String)
  @IsString()
  category: string;

  @Field((returns) => Number)
  @IsString()
  rating: number;

  @Field((returns) => [Episode])
  @IsArray()
  episodes: Episode[];
}
