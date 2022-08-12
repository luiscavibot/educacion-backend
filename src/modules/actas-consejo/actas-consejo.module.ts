import { Module } from '@nestjs/common';
import { ActasConsejoService } from './actas-consejo.service';
import { ActasConsejoController } from './actas-consejo.controller';

@Module({
  providers: [ActasConsejoService],
  controllers: [ActasConsejoController]
})
export class ActasConsejoModule {}
