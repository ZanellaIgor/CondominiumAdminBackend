import { Test, TestingModule } from '@nestjs/testing';
import { WarningsController } from './warnings.controller';

describe('WarningsController', () => {
  let controller: WarningsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarningsController],
    }).compile();

    controller = module.get<WarningsController>(WarningsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
