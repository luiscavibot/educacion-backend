import { Module } from '@nestjs/common';
import { TramitesController } from './tramites.controller';
import { TramitesService } from './tramites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tramite])],
  controllers: [TramitesController],
  providers: [TramitesService],
})
export class TramitesModule {}
