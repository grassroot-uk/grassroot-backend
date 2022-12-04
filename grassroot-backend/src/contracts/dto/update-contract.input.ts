import { CreateContractInput } from './create-contract.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContractInput extends PartialType(CreateContractInput) {
  @Field(() => Int)
  id: number;
}
