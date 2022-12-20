import { Injectable, HttpException, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { TypeCategory } from '@prisma/client';
import { User } from 'src/users/models/user.model';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryInput: CreateCategoryInput, user: User) {
    return this.prismaService.category.create({
      data: {
        ...createCategoryInput,
        type: this.stringToTypeCategory(createCategoryInput.type),
        ownerId: user.id,
      },
    });
  } 

  findAll() {
    return this.prismaService.category.findMany({});
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const oldObject = this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!oldObject) {
      throw new HttpException("Category doesn't exists", 400);
    }

    return this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        ...oldObject,
        ...updateCategoryInput,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
  }

  stringToTypeCategory(type: string) {
    switch (type) {
      case 'CATEGORY':
        return TypeCategory.CATEGORY;
      case 'SUBCATEGORY':
        return TypeCategory.SUBCATEGORY;

      default:
        return TypeCategory.CATEGORY;
    }
  }
}
