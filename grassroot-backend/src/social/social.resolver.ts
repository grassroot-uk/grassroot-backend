import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SocialService } from './social.service';
import { Social } from './entities/social.entity';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';

@Resolver(() => Social)
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Mutation(() => Social)
  @UseGuards(GqlAuthGuard)
  createSocial(
    @Args('createSocialInput') createSocialInput: CreateSocialInput,
    @UserEntity() user: User
  ) {
    return this.socialService.create(createSocialInput, user);
  }

  @Query(() => [Social], { name: 'allSocials' })
  findAll() {
    return this.socialService.findAll();
  }

  @Query(() => Social, { name: 'socialById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.socialService.findOne(id);
  }

  @Mutation(() => Social)
  @UseGuards(GqlAuthGuard)
  updateSocial(
    @Args('updateSocialInput') updateSocialInput: UpdateSocialInput,
    @UserEntity() user: User
  ) {
    return this.socialService.update(
      updateSocialInput.id,
      updateSocialInput,
      user
    );
  }

  @Mutation(() => Social)
  @UseGuards(GqlAuthGuard)
  removeSocial(
    @Args('id', { type: () => String }) id: string,
    @UserEntity() user: User
  ) {
    return this.socialService.remove(id, user);
  }
}
