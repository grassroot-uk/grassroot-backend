import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDaoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
