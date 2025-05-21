import { Test, TestingModule } from '@nestjs/testing';
import { RatoTasksService } from './rato-tasks.service';

describe('RatoTasksService', () => {
  let service: RatoTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatoTasksService],
    }).compile();

    service = module.get<RatoTasksService>(RatoTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
