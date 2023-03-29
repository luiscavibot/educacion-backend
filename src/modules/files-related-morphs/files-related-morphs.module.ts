import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRelatedMorph } from './entity';
import { FilesRelatedMorphsService } from './files-related-morphs.service';
import { FilesRelatedMorphsController } from './files-related-morphs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileRelatedMorph])],
  controllers: [FilesRelatedMorphsController],
  providers: [FilesRelatedMorphsService],
})
export class FileRelatedMorphModule {}
