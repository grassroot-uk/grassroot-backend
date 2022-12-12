import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from 'src/users/models/user.model';
import { GenerateNonce } from './dto/nonce.input';
import { Nonce } from './models/nonce.model';
import { Logger } from '@nestjs/common';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Nonce)
  async generateNonce(@Args('data') data: GenerateNonce) {
    return await this.auth.createNonce(data);
  }

  @Mutation(() => Auth)
  async signupOrLogin(@Args('data') data: SignupInput) {
    if (data.email) {
      data.email = data?.email.toLowerCase();
    }
    const { accessToken, refreshToken } = await this.auth.createUserOrLogin(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
