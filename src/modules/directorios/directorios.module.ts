import { Module } from '@nestjs/common';
import { DirectoriosService } from './directorios.service';
import { DirectoriosController } from './directorios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directorio } from './entity/directorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directorio])],
  providers: [DirectoriosService],
  controllers: [DirectoriosController],
})
export class DirectoriosModule {}
