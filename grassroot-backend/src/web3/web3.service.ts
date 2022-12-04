import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3Storage, File, Filelike } from 'web3.storage';

@Injectable()
export class Web3Service {
  client: Web3Storage;

  constructor(private configService: ConfigService) {
    this.client = new Web3Storage({
      token: this.configService.get<string>('WEB3_STORAGE_API_KEY'),
    });
  }

  async uploadFile(file: Filelike | File) {
    return this.client.put([file]);
  }
}
