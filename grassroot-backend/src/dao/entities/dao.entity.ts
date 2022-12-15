import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
@ObjectType()
export class Dao {

  @Field(() => String, {description: 'Id for the DAO'})
  id: string; 

  @Field(() => String, { description: 'Name of the DAO.' })
  name: string;

  @Field(() => String, { description: 'Description of the DAO.' })
  description: string;

  @Field(() => String, { description: 'DAO admin address.' })
  adminAddress: string;

  @Field(() => String, { description: 'DAO admin Id.' })
  adminId: string;

  @Field(() => String, {
    description: 'Url to the Profile Picture for the DAO.',
  })
  profilePicture: string;

  @Field(() => String, {
    description: 'Url to the Background Picture for the DAO.',
  })
  backgroundPicture: string;

  @Field(() => GraphQLJSON, { description: 'Any Metadata for DAO' })
  metadata: string;
}
