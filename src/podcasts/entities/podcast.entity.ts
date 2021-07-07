import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';
import { Episode } from './episode.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsString()
  title: string;

  @Field((returns) => String)
  @Column()
  @IsString()
  category: string;

  @Field((returns) => Number)
  @Column({ default: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field((returns) => [Episode])
  @OneToMany((type) => Episode, (episode) => episode.podcast)
  episodes: Episode[];
}
