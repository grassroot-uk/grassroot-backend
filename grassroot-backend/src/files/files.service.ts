import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/users/models/user.model';
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
    file: Express.Multer.File,
    user: User
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
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async UploadOne(file: Express.Multer.File, user: User) {
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
        imageCid: imageCid,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async UploadOneFile(file: Express.Multer.File, user: User) {
    const uploadFile = new File([file.buffer], file.originalname, {
      type: file.mimetype,
    });
    const cid = await this.web3Service.uploadFile(uploadFile);

    const DEFAULT_RESOLVER = 'ipfs.w3s.link';

    // Store a new File in db
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        resolver: DEFAULT_RESOLVER,
        metadataUrl: `https://${cid}.${DEFAULT_RESOLVER}/${file.originalname}`,
        uploadedIPFS: true,
        metadataCid: cid,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async UploadManyImage(files: Express.Multer.File[], user: User) {
    const cids = files.map((file) =>
      this.web3Service.uploadFile(
        new File([file.buffer], file.originalname, { type: file.mimetype })
      )
    );

    const uploadedCids = await Promise.all(cids);
    const DEFAULT_RESOLVER = 'ipfs.w3s.link';

    await this.prisma.file.createMany({
      data: uploadedCids.map((imageCid, index) => {
        const file = files[index];
        return {
          name: file.originalname,
          resolver: DEFAULT_RESOLVER,
          imageUrl: `https://${imageCid}.${DEFAULT_RESOLVER}/${file.originalname}`,
          uploadedIPFS: true,
          imageCid: imageCid,
          ownerId: user.id,
        };
      }),
    });

    return Promise.all(uploadedCids.map((cid) => this.findCid(cid, 'image')));
  }

  findAll() {
    return this.prisma.file.findMany({
      include: {
        owner: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.file.findFirst({
      where: { id: id },
      include: {
        owner: true,
      },
    });
  }

  async findCid(cid: string, type: 'image' | 'metadata') {
    if (type === 'image') {
      return this.prisma.file.findFirst({
        where: { imageCid: cid },
        include: {
          owner: true,
        },
      });
    } else {
      return this.prisma.file.findFirst({
        where: { metadataCid: cid },
        include: {
          owner: true,
        },
      });
    }
  }

  update(id: string, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: string) {
    return `This action removes a #${id} file`;
  }
}
