import { Podcast } from './podcast.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsString()
  title: string;

  @Field((returns) => Number)
  @Column({ default: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Field((returns) => Podcast)
  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;
}
