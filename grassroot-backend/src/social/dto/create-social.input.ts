import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateSocialInput {
  @Field(() => String, { description: 'Name of the Social' })
  name: string;

  @Field(() => String, { description: 'Icon of the Social' })
  icon: string;

  @Field(() => String, { description: 'URL of the Social' })
  url: string;

  @Field(() => GraphQLJSON, {
    description: 'Other details to the Social',
    nullable: true,
  })
  other: string;
}
