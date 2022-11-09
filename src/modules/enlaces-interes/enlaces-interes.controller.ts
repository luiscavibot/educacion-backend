import { Controller, DefaultValuePipe, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EnlacesInteresService } from './enlaces-interes.service';
import { EnlaceInteres } from './entity';

@Controller('enlaces-interes')
export class EnlacesInteresController {
    constructor(
        private readonly enlaceInteresService: EnlacesInteresService,
      ) {}


}
