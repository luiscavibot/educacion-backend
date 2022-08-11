import { Module } from '@nestjs/common';
import { DocumentosOficialesService } from './documentos-oficiales.service';
import { DocumentosOficialesController } from './documentos-oficiales.controller';

@Module({
  providers: [DocumentosOficialesService],
  controllers: [DocumentosOficialesController]
})
export class DocumentosOficialesModule {}
