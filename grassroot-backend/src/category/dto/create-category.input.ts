import { InputType, Int, Field } from '@nestjs/graphql';
import { TypeCategory } from '@prisma/client';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Name of the Category or SubCategory'})
  name: string;

  @Field(() => String, {description: 'Description of the Category'})
  type: TypeCategory;
}
