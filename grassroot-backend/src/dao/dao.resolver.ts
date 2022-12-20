import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DaoService } from './dao.service';
import { Dao } from './entities/dao.entity';
import { CreateDaoInput } from './dto/create-dao.input';
import { UpdateDaoInput } from './dto/update-dao.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UserEntity } from 'src/common/decorators/user.decorator';

@Resolver(() => Dao)
export class DaoResolver {
  constructor(private readonly daoService: DaoService) {}

  @Mutation(() => Dao)
  @UseGuards(GqlAuthGuard)
  createDao(
    @Args('createDaoInput') createDaoInput: CreateDaoInput,
    @UserEntity() user: User
  ) {
    return this.daoService.create(createDaoInput, user);
  }

  @Query(() => [Dao], { name: 'daos' })
  findAll() {
    return this.daoService.findAll();
  }

  @Query(() => Dao, { name: 'daoById', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.daoService.findOne(id);
  }

  @Query(() => [Dao], { name: 'myDaos' })
  @UseGuards(GqlAuthGuard)
  findUserDaos(@UserEntity() user: User) {
    return this.daoService.findMyDaos(user);
  }

  @Mutation(() => Dao)
  @UseGuards(GqlAuthGuard)
  updateDao(
    @Args('updateDaoInput') updateDaoInput: UpdateDaoInput,
    @UserEntity() user: User
  ) {
    return this.daoService.update(updateDaoInput.id, updateDaoInput, user);
  }

  // @Mutation(() => Dao)
  // @UseGuards()
  // removeDao(@Args('id', { type: () => Int }) id: number) {
  //   return this.daoService.remove(id);
  // }
}
