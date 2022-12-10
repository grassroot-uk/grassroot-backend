import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Mutation(() => String)
  getNonce(address: String): string {
    return "nonce";
  }
  
}
