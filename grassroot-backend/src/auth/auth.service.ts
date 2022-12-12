import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { GenerateNonce } from './dto/nonce.input';
import { Nonce } from './models/nonce.model';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { SignatureService } from './signature.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly signatureService: SignatureService
  ) {}

  async createNonce(payload: GenerateNonce): Promise<Nonce> {
    // Push Address -> Nonce Into the PendingNonce Table.
    const newNonce = uuidv4();

    try {
      // const pendingNonce = await this.prisma.pendingNonce.upsert({
      //   where: {
      //     address: payload.address,
      //   },
      //   create: {
      //     nonce: newNonce,
      //     address: payload.address,
      //   },
      //   update: {
      //     nonce: newNonce,
      //   },
      // });

      const existing = await this.prisma.pendingNonce.findFirst({
        where: {
          address: payload.address,
        },
      });

      if (existing) {
        return {
          ...existing,
          success: true,
        };
      }

      const newCreated = await this.prisma.pendingNonce.create({
        data: {
          nonce: newNonce,
          address: payload.address,
        },
      });

      return { ...newCreated, success: true };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `Address ${payload.address} is alredy created.`
        );
      }
      throw new Error(e);
    }
  }

  async createUserOrLogin(payload: SignupInput): Promise<Token> {
    try {
      const isUser = await this.prisma.user.findFirst({
        where: {
          address: payload.address,
        },
      });

      if (isUser) {

        const signatureValid = this.signatureService.validateSignature(
          this.formatMessage(isUser.nonce),
          payload.signature,
          isUser.address
        );
  
        if (!signatureValid) {
          throw new HttpErrorByCode[403]('Not a valid Signature!!');
        }

        return this.generateTokens({
          userId: isUser.id,
        });
      }

      // Get the nonce from the pendingNonce Table.
      const pendingNonce = await this.prisma.pendingNonce.findFirst({
        where: {
          address: payload.address,
        },
      });

      const signatureValid = this.signatureService.validateSignature(
        this.formatMessage(pendingNonce.nonce),
        payload.signature,
        pendingNonce.address
      );

      if (!signatureValid) {
        throw new HttpErrorByCode[403]('Not a valid Signature!!');
      }

      const { signature: _, ...creatUser } = payload;

      const user = await this.prisma.user.create({
        data: {
          ...creatUser,
          nonce: pendingNonce.nonce,
          role: 'USER',
        },
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`User ${payload.address} already created.`);
      }
      Logger.log(e);
      throw new Error(e);
    }
  }

  private formatMessage(nonce: string) {
    return `You are signing to login into Grassroot: ${nonce}`;
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({ where: { id } });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
