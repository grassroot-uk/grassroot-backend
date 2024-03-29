import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateCampaignInput {

  @Field(() => String, {description: 'Blockchain CampaignID of the Campaign'})
  campaignId: string;

  @Field(() => String, { description: 'Title of the Campaign' })
  title: string;

  @Field(() => String, { description: 'Subtitle of the Campaign' })
  subtitle: string;

  @Field(() => String, {
    description: 'Transaction Hash on which Campaign is created.',
  })
  transactionHash: string;

  @Field(() => [String], { description: 'Images to the Campaign' })
  images: [string];

  @Field(() => [String], { description: 'Videos to the Campaign' })
  videos: [string];

  @Field(() => String, { description: 'Token denomination name of the token.' })
  tokenCurrency: string;

  @Field(() => String, { description: 'Token Address of the token.' })
  tokenCurrencyAddress: string;

  @Field(() => String, {
    description: 'Minimum Contribution amount to the Campaign',
  })
  minAmount: string;

  @Field(() => String, {
    description: 'Total Goal Amount to the Campaign',
  })
  goalAmount: string;

  @Field(() => String, {
    description: 'Completion unix timeStamp to the Campaign',
  })
  completionDate: string;

  @Field(() => String, { description: 'Country to the campaign' })
  country: string;

  @Field(() => String, { description: 'State to the campaign' })
  state: string;

  @Field(() => String, { description: 'City to the campaign' })
  city: string;

  @Field(() => GraphQLJSON, { description: 'Country to the campaign' })
  metadata?: string;
}
