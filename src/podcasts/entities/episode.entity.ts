import { Podcast } from './podcast.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@InputType('EpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode {
  @Field((returns) => Number)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Field((returns) => String)
  @Column()
  @IsString()
  title: string;

  @Field((returns) => Number)
  @Column()
  @IsNumber()
  rating: number;

  @Field((returns) => Podcast)
  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  podcast: Podcast;
}
