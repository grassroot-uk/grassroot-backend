import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { ethers } from 'ethers';
import { Logger } from '@nestjs/common';
import { SecurityConfig } from 'src/common/configs/config.interface';

@Injectable()
export class SignatureService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    const saltOrRounds = securityConfig.bcryptSaltOrRound;

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  constructor(private configService: ConfigService) {}

  validateSignature(
    message: string,
    signature: string,
    expectedToEqualTo: string
  ): boolean {
    Logger.log(signature);
    const signingAddress = ethers.utils.verifyMessage(message, signature);
    Logger.log("Signing Address: ", signingAddress);
    return signingAddress === expectedToEqualTo;
  }

  hashMessage(message: string): Promise<string> {
    return hash(message, this.bcryptSaltRounds);
  }
}
