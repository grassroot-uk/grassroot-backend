import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';


@Resolver(() => Campaign)
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Mutation(() => Campaign)
  @UseGuards(GqlAuthGuard)
  createCampaign(
    @Args('createCampaignInput') createCampaignInput: CreateCampaignInput,
    @Args('daoId') existingDaoId: string,
    @UserEntity() user: User
  ) {
    return this.campaignService.create(
      createCampaignInput,
      existingDaoId,
      user
    );
  }

  @Query(() => [Campaign], { name: 'campaign' })
  findAll() {
    return this.campaignService.findAll();
  }

  @Query(() => Campaign, { name: 'campaignById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.campaignService.findOne(id);
  }

  @Mutation(() => Campaign)
  @UseGuards(GqlAuthGuard)
  updateCampaign(
    @Args('updateCampaignInput') updateCampaignInput: UpdateCampaignInput,
    @UserEntity() user: User
  ) {
    return this.campaignService.update(
      updateCampaignInput.id,
      updateCampaignInput,
      user
    );
  }
}
