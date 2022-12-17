import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLBigInt, GraphQLJSON } from 'graphql-scalars';
import { Dao } from 'src/dao/entities/dao.entity';

@ObjectType()
export class Campaign {
  @Field(() => String, { description: 'Id of the Campaign' })
  id: string;

  @Field(() => String, { description: 'Title of the Campaign' })
  title: string;

  @Field(() => String, { description: 'Subtitle of the Campaign' })
  subtitle: string;

  @Field(() => String, {description: 'Transaction Hash on which Campaign is created.'})
  transactionHash: string;

  @Field(() => [String], {description: 'Images to the Campaign'})
  images: [string]

  @Field(() => [String], {description: 'Videos to the Campaign'})
  videos: [string]

  @Field(() => String, {description: 'Token denomination name of the token.'})
  tokenCurrency: string;

  @Field(() => String, {description: 'Token Address of the token.'})
  tokenCurrencyAddress: string;

  @Field(() => String, {description: 'Minimum Contribution amount to the Campaign'})
  minAmount: string

  @Field(() => String, {description: 'Total Goal Amount to the Campaign'})
  goalAmount: string

  @Field(() => String, {description: 'Completion unix timeStamp to the Campaign'})
  completionDate: string

  @Field(() => String, {description: 'Country to the campaign'})
  country: string;

  @Field(() => String, {description: 'State to the campaign'})
  state: string;

  @Field(() => String, {description: 'City to the campaign'})
  city: string;

  @Field(() => GraphQLJSON, {description: 'Country to the campaign'})
  metadata: string;
  
  @Field(() => String, {description: 'DAO Id to which this campaign is under.'})
  daoId: string

  @Field(() => Dao, {description: "Owning Dao for this campaign"})
  dao: Dao

}
