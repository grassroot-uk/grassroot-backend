import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dao {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
