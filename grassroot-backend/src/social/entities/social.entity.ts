import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Social extends BaseModel {
  @Field(() => String, { description: 'Name of the Social' })
  name: string;

  @Field(() => String, { description: 'Icon of the Social' })
  icon: string;

  @Field(() => String, { description: 'URL of the Social' })
  url: string;

  @Field(() => GraphQLJSON, {description: "Other details to the Social"})
  other: String
}
