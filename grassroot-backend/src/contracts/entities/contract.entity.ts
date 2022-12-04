import { ObjectType, Field,  } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Contract extends BaseModel {
  @Field(() => String, { description: 'Name of the contract' })
  name: string;

  @Field(() => String, { description: 'Description of the contract' })
  description: string;

  @Field(() => String, {description: "Network Name"})
  networkName: string;

  @Field(() => String, {description: "Address of the contract"})
  address: string;

  @Field(() => String, {description: "Transaction hash of Contract Deployment"})
  transactionHash: string

  @Field(() => GraphQLJSON, {description: "Metadata of Contract"})
  metadata: JSON
}
