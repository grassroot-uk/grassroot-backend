import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { Web3Module } from 'src/web3/web3.module';

@Module({
  imports: [
    Web3Module
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
