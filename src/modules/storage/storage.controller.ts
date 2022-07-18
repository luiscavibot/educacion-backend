import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';

@Controller('storages')
@ApiTags('storages')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    let data = await this.storageService.uploadFile(file);
    return { message: 'Imagen subida', data };
  }
}
