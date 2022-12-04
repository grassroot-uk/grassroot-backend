import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContractsService } from './contracts.service';
import { Contract } from './entities/contract.entity';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';

@Resolver(() => Contract)
export class ContractsResolver {
  constructor(private readonly contractsService: ContractsService) {}

  @Mutation(() => Contract)
  createContract(@Args('createContractInput') createContractInput: CreateContractInput) {
    return this.contractsService.create(createContractInput);
  }

  @Query(() => [Contract], { name: 'contracts' })
  findAll() {
    return this.contractsService.findAll();
  }

  @Query(() => Contract, { name: 'contract' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contractsService.findOne(id);
  }

  @Mutation(() => Contract)
  updateContract(@Args('updateContractInput') updateContractInput: UpdateContractInput) {
    return this.contractsService.update(updateContractInput.id, updateContractInput);
  }

  @Mutation(() => Contract)
  removeContract(@Args('id', { type: () => Int }) id: number) {
    return this.contractsService.remove(id);
  }
}
