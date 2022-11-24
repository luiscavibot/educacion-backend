import { Module } from '@nestjs/common';
import { ActasConsejoService } from './actas-consejo.service';
import { ActasConsejoController } from './actas-consejo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaConsejo } from './entity';
import { StorageService } from '../../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActaConsejo])],
  providers: [ActasConsejoService, StorageService],
  controllers: [ActasConsejoController],
})
export class ActasConsejoModule {}
