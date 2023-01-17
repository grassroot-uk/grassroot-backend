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
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntityJwt } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';

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
          fileType: 'jpeg|png|webp|jpg|svg',
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File,
    @UserEntityJwt() user: User
  ) {
    return this.filesService.createAndUpload(data, file, user);
  }

  @Post('uploadImage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadOnly(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|png|webp|jpg|svg',
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File,
    @UserEntityJwt() user: User
  ) {
    return this.filesService.UploadOne(file, user);
  }

  @Post('uploadImages')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @UserEntityJwt() user: User
  ) {
    return this.filesService.UploadManyImage(files, user);
  }

  @Post('uploadFile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1000 * 1000, // 1MiB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File,
    @UserEntityJwt() user: User
  ) {
    return this.filesService.UploadOneFile(file, user);
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
  update(
    @Param('fileId') fileId: string,
    @Body() updateFileDto: UpdateFileDto
  ) {
    return this.filesService.update(fileId, updateFileDto);
  }

  // @Delete(':fileId')
  // remove(@Param('fileId') fileId: string) {
  //   return this.filesService.remove(fileId);
  // }
}
