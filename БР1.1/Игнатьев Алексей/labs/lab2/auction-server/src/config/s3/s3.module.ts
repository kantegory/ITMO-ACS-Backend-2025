import { Module } from '@nestjs/common';
import { StorageService } from './s3.service';

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
