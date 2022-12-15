import { CreateDaoInput } from './create-dao.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDaoInput extends PartialType(CreateDaoInput) {
  @Field(() => String, {description: "Id of the string"})
  id: string
}
