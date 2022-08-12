import { Module } from '@nestjs/common';
import { DocumentosOficialesService } from './documentos-oficiales.service';
import { DocumentosOficialesController } from './documentos-oficiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoOficial } from './entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoOficial])],
  providers: [DocumentosOficialesService, StorageService],
  controllers: [DocumentosOficialesController],
})
export class DocumentosOficialesModule {}
