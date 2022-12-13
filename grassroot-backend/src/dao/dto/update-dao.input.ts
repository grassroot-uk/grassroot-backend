import { CreateDaoInput } from './create-dao.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDaoInput extends PartialType(CreateDaoInput) {
  @Field(() => Int)
  id: number;
}
