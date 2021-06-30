import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class MutationOutput {
  @Field((returns) => String, { nullable: true })
  @IsString()
  @IsOptional()
  error?: string;

  @Field((returns) => Boolean)
  @IsBoolean()
  ok: boolean;
}
