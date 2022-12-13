import { Injectable } from '@nestjs/common';
import { CreateDaoInput } from './dto/create-dao.input';
import { UpdateDaoInput } from './dto/update-dao.input';

@Injectable()
export class DaoService {
  create(createDaoInput: CreateDaoInput) {
    return 'This action adds a new dao';
  }

  findAll() {
    return `This action returns all dao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dao`;
  }

  update(id: number, updateDaoInput: UpdateDaoInput) {
    return `This action updates a #${id} dao`;
  }

  remove(id: number) {
    return `This action removes a #${id} dao`;
  }
}
