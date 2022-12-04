import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';

@Injectable()
export class ContractsService {

  constructor( private prisma: PrismaService) {}

  create(createContractInput: CreateContractInput) {
    return {...createContractInput};
  }

  findAll() {
    return `This action returns all contracts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
  }

  update(id: number, updateContractInput: UpdateContractInput) {
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
