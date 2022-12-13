import { Test, TestingModule } from '@nestjs/testing';
import { DaoResolver } from './dao.resolver';
import { DaoService } from './dao.service';

describe('DaoResolver', () => {
  let resolver: DaoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaoResolver, DaoService],
    }).compile();

    resolver = module.get<DaoResolver>(DaoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
