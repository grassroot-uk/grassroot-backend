import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateDaoInput {
  @Field(() => String, { description: 'Name of the DAO.' })
  name: string;

  @Field(() => String, { description: 'Description of the DAO.' })
  description: string;

  @Field(() => String, { description: 'Url to the Profile Picture for the DAO.' })
  profilePicture: string;

  @Field(() => String, { description: 'Url to the Background Picture for the DAO.' })
  backgroundPicture: string;

  @Field(() => GraphQLJSON, {description: 'Metadata JSON to the DAO'})
  metadata: string;
}
