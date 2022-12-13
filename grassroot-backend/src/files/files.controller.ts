import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Body() data: CreateFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|png',
        })
        .addMaxSizeValidator
        ({
          maxSize: 1000*1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    return this.filesService.createAndUpload(data, file);
  }

  @Post('uploadImage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadOnly(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|png',
        })
        .addMaxSizeValidator
        ({
          maxSize: 1000*1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    return this.filesService.UploadOne(file);
  }

  @Post('uploadImage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator
        ({
          maxSize: 1000*1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    return this.filesService.UploadOne(file);
  }
 
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':fileId')
  findOne(@Param('fileId') fileId: string) {
    return this.filesService.findOne(fileId);
  }

  @Patch(':fileId')
  @UseGuards(JwtAuthGuard)
  update(@Param('fileId') fileId: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(fileId, updateFileDto);
  }

  // @Delete(':fileId')
  // remove(@Param('fileId') fileId: string) {
  //   return this.filesService.remove(fileId);
  // }
}
