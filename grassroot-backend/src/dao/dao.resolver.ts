import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DaoService } from './dao.service';
import { Dao } from './entities/dao.entity';
import { CreateDaoInput } from './dto/create-dao.input';
import { UpdateDaoInput } from './dto/update-dao.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Dao)
export class DaoResolver {
  constructor(private readonly daoService: DaoService) {}

  @Mutation(() => Dao)
  @UseGuards(GqlAuthGuard)
  createDao(@Args('createDaoInput') createDaoInput: CreateDaoInput) {
    return this.daoService.create(createDaoInput);
  }

  @Query(() => [Dao], { name: 'dao' })
  findAll() {
    return this.daoService.findAll();
  }

  @Query(() => Dao, { name: 'dao' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.daoService.findOne(id);
  }

  @Mutation(() => Dao)
  @UseGuards(GqlAuthGuard)
  updateDao(@Args('updateDaoInput') updateDaoInput: UpdateDaoInput) {
    return this.daoService.update(updateDaoInput.id, updateDaoInput);
  }
  
  // @Mutation(() => Dao)
  // @UseGuards()
  // removeDao(@Args('id', { type: () => Int }) id: number) {
  //   return this.daoService.remove(id);
  // }
}
