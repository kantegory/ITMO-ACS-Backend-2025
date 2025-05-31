import { Test, TestingModule } from '@nestjs/testing';
import { RatoTasksController } from './rato-tasks.controller';
import { RatoTasksService } from './rato-tasks.service';

describe('RatoTasksController', () => {
  let controller: RatoTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatoTasksController],
      providers: [RatoTasksService],
    }).compile();

    controller = module.get<RatoTasksController>(RatoTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
