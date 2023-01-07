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
    return this.prisma.contract.findMany();
  }

  findOne(id: string) {
    return this.prisma.contract.findFirst({
      where: {
        id: id
      }
    });
  }

  findOneByAddress(address: string) {
    return this.prisma.contract.findFirst({
      where: {
        address: address
      }
    });
  }

  update(id: string, updateContractInput: UpdateContractInput) {
    return `This action updates a #${id} contract`;
  }

  // remove(id: string) {
  //   return `This action removes a #${id} contract`;
  // }
}
