import { HttpException, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/models/user.model';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';

@Injectable()
export class CampaignService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createCampaignInput: CreateCampaignInput,
    existingDaoId: string,
    user: User
  ) {
    const existingDao = await this.prismaService.dAO.findFirst({
      where: {
        id: existingDaoId,
      },
    });

    if (!existingDao) {
      throw new HttpException('DAO not exists', 400);
    }

    if (existingDao.adminId !== user.id) {
      throw new HttpException('Not DAO Owner', 403);
    }

    return this.prismaService.campaign.create({
      data: {
        ...createCampaignInput,
        dao: {
          connect: {
            id: existingDao.id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.campaign.findMany({
      include: {
        dao: true,
        category: true,
        subCategory: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.campaign.findFirst({
      include: {
        dao: true,
        category: true,
        subCategory: true,
      },
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateCampaignInput: UpdateCampaignInput,
    user: User
  ) {
    const existingCampaign = await this.prismaService.campaign.findFirst({
      where: {
        id: id,
      },
      include: {
        dao: true,
      },
    });

    if (!existingCampaign) {
      throw new HttpException('Campaign does not exists', 400);
    }

    if (existingCampaign.dao.adminId !== user.id) {
      throw new HttpException('Not DAO Owner', 403);
    }

    return this.prismaService.campaign.update({
      where: {
        id: id,
      },
      data: {
        ...updateCampaignInput,
      },
    });
  }
}
