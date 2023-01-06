import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
import { GqlAdminAuthGuard } from 'src/auth/gql-admin-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Contract)
export class ContractsResolver {
  constructor(private readonly contractsService: ContractsService) {}

  @Mutation(() => Contract)
  @UseGuards(GqlAdminAuthGuard)
  createContract(
    @Args('createContractInput') createContractInput: CreateContractInput
  ) {
    return this.contractsService.create(createContractInput);
  }

  @Query(() => [Contract], { name: 'contracts' })
  findAll() {
    return this.contractsService.findAll();
  }

  @Query(() => Contract, { name: 'contract' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.contractsService.findOne(id);
  }

  @Mutation(() => Contract)
  @UseGuards(GqlAdminAuthGuard)
  updateContract(
    @Args('updateContractInput') updateContractInput: UpdateContractInput
  ) {
    return this.contractsService.update(
      updateContractInput.id,
      updateContractInput
    );
  }
}
