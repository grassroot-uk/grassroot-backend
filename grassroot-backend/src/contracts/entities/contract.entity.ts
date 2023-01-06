import { ObjectType, Field,  } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Contract extends BaseModel {
  @Field(() => String, { description: 'Name of the contract' })
  name: string;

  @Field(() => String, { description: 'Network name' })
  networkName: string;

  @Field(() => String, {description: "Network Slug"})
  networkSlug: string;

  @Field(() => String, {description: "Address of the contract"})
  address: string;

  @Field(() => Number, {description: "Chain Id of the network"})
  chainId: number;

  @Field(() => String, {description: "Explorer URL for Contract"})
  explorerUrl: string;

  @Field(() => GraphQLJSON, {description: "ABI of Contract"})
  abi: JSON
}
