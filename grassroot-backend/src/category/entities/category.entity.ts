import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {

  @Field(() => String, { description: 'Id of the Category' })
  id: string;

  @Field(() => String, { description: 'Name of the Category' })
  name: string;

  @Field(() => String, { description: 'Type of the Category' })
  type: string;
}
