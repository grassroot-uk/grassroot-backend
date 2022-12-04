import { Test, TestingModule } from '@nestjs/testing';
import { ContractsResolver } from './contracts.resolver';
import { ContractsService } from './contracts.service';

describe('ContractsResolver', () => {
  let resolver: ContractsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractsResolver, ContractsService],
    }).compile();

    resolver = module.get<ContractsResolver>(ContractsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
