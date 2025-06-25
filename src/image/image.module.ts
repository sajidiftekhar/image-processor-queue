import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageProcessor } from './image.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageProcessor],
})
export class ImageModule {}
