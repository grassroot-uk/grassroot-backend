import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Web3Service } from 'src/web3/web3.service';
import { Blob, File } from 'web3.storage';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(
    private web3Service: Web3Service,
    private prisma: PrismaService
  ) {}

  async createAndUpload(
    createFileDto: CreateFileDto,
    file: Express.Multer.File
  ) {
    let requestMetadata;
    try {
      requestMetadata = JSON.parse(createFileDto.metadata);
    } catch (e) {
      console.log(e);
      return new HttpException('Bad Metadata', HttpStatus.BAD_REQUEST);
    }

    const uploadFile = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const imageCid = await this.web3Service.uploadFile(uploadFile);

    const metadataJSON = {
      ...requestMetadata,
      imageUrl: `ipfs://${imageCid}`,
      image: `ipfs://${imageCid}`,
    };
    const metadataBlob = new Blob([JSON.stringify(metadataJSON)], {
      type: 'application/json',
    });

    const metadataCid = await this.web3Service.uploadFile(
      new File([metadataBlob], 'metadata.json')
    );

    const DEFAULT_RESOLVER = 'ipfs.w3s.link';

    // Store a new File in db
    return this.prisma.file.create({
      data: {
        name: createFileDto.name,
        resolver: DEFAULT_RESOLVER,
        imageUrl: `https://${imageCid}.${DEFAULT_RESOLVER}/${file.originalname}`,
        metadataUrl: `https://${metadataCid}.${DEFAULT_RESOLVER}/metadata.json`,
        uploadedIPFS: true,
        metadataCid: metadataCid,
        imageCid: imageCid,
        metadata: metadataJSON,
      },
    });
  }

  async UploadOne(
    file: Express.Multer.File
  ) {
    
    const uploadFile = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const imageCid = await this.web3Service.uploadFile(uploadFile);

    const DEFAULT_RESOLVER = 'ipfs.w3s.link';

    // Store a new File in db
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        resolver: DEFAULT_RESOLVER,
        imageUrl: `https://${imageCid}.${DEFAULT_RESOLVER}/${file.originalname}`,
        uploadedIPFS: true,
        imageCid: imageCid
      },
    });
  }

  findAll() {
    return this.prisma.file.findMany();
  }

  findOne(id: string) {
    return this.prisma.file.findFirst({ where: { id: id } });
  }

  update(id: string, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: string) {
    return `This action removes a #${id} file`;
  }
}
