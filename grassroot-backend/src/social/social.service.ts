import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/models/user.model';
import { CreateSocialInput } from './dto/create-social.input';
import { UpdateSocialInput } from './dto/update-social.input';

@Injectable()
export class SocialService {
  constructor(private prismaService: PrismaService) {}

  async create(createSocialInput: CreateSocialInput, user: User) {
    return this.prismaService.social.create({
      data: {
        ...createSocialInput,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.social.findMany({});
  }

  findOne(id: string) {
    return this.prismaService.social.findFirst({ where: { id: id } });
  }

  async update(id: string, updateSocialInput: UpdateSocialInput, user: User) {
    await this.checkUserWithId(id, user.id);
    return this.prismaService.social.update({
      include: {
        user: true,
      },
      where: {
        id: id,
      },
      data: {
        ...updateSocialInput,
      },
    });
  }

  async remove(id: string, user: User) {
    await this.checkUserWithId(id, user.id);
    return this.prismaService.social.delete({
      where: {
        id: id,
      },
    });
  }

  async checkUserWithId(id: string, userId: string) {
    const social = await this.prismaService.social.findFirst({
      where: { id: id },
      include: { user: true },
    });

    if (!social) {
      throw new HttpException("Social doesn't exists!!", 400);
    }

    if (social.user.id !== userId) {
      throw new HttpException('Unauthorized!!', 403);
    }
  }
}
