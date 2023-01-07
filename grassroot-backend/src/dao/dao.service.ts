import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/models/user.model';
import { CreateDaoInput } from './dto/create-dao.input';
import { UpdateDaoInput } from './dto/update-dao.input';

@Injectable()
export class DaoService {
  constructor(private prismaService: PrismaService) {}

  create(createDaoInput: CreateDaoInput, user: User) {
    return this.prismaService.dAO.create({
      data: {
        ...createDaoInput,
        adminId: user.id,
        adminAddress: user.address,
      },
    });
  }

  findAll() {
    return this.prismaService.dAO.findMany({
      include: {
        admin: true,
        activeCampaigns: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.dAO.findFirst({
      where: {
        id: id,
      },
      include: {
        admin: true,
        activeCampaigns: true,
      },
    });
  }

  findMyDaos(user: User) {
    return this.prismaService.dAO.findMany({
      where: {
        adminAddress: user.address,
      },
      include: {
        admin: true,
        activeCampaigns: true,
      },
    });
  }

  update(id: string, updateDaoInput: UpdateDaoInput, user: User) {
    return this.prismaService.dAO.update({
      where: {
        id: id,
      },
      data: {
        ...updateDaoInput,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} dao`;
  // }
}
