import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsResolver } from './contracts.resolver';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  providers: [ContractsResolver, ContractsService],
})
export class ContractsModule {}
