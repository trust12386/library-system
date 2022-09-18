import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../../upload_dist'),
        filename(req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
