import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnlacesInteresController } from './enlaces-interes.controller';
import { EnlacesInteresService } from './enlaces-interes.service';
import { EnlaceInteres } from './entity';

@Module({
  imports:[TypeOrmModule.forFeature([EnlaceInteres])],
  controllers: [EnlacesInteresController],
  providers: [EnlacesInteresService]
})
export class EnlacesInteresModule {}
