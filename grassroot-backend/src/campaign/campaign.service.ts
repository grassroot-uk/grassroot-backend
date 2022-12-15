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
        id: existingDaoId
      }
    });

    if(!existingDao) {
      throw new HttpException("DAO not exists", 400);
    }

    if(existingDao.adminId !== user.id) {
      throw new HttpException("Not DAO Owner", 403);
    }

    return this.prismaService.campaign.create({
      data: {
        ...createCampaignInput
      }
    });
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: string) {
    return `This action returns a #${id} campaign`;
  }

  update(id: string, updateCampaignInput: UpdateCampaignInput) {
    return `This action updates a #${id} campaign`;
  }
}
