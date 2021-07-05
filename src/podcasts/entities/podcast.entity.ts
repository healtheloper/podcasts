import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Episode } from './episode.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast {
  @Field((returns) => Number)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Field((returns) => String)
  @Column()
  @IsString()
  title: string;

  @Field((returns) => String)
  @Column()
  @IsString()
  category: string;

  @Field((returns) => Number)
  @Column()
  @IsString()
  rating: number;

  @Field((returns) => [Episode])
  @OneToMany((type) => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
