import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateContractInput {
  
  @Field(() => String, { description: 'Name of the contract' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'Description of the contract' })
  @IsNotEmpty()
  description: string;

  @Field(() => String, {description: "Network Name"})
  @IsNotEmpty()
  networkName: string;

  @Field(() => String, {description: "Address of the contract"})
  @IsNotEmpty()
  address: string;

  @Field(() => String, {description: "Transaction hash of Contract Deployment"})
  @IsNotEmpty()
  transactionHash: string

  @Field(() => GraphQLJSON, {description: "Metadata of Contract"})
  @IsNotEmpty()
  metadata: JSON
}
