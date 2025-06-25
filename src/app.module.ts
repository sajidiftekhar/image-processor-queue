import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ImageModule,
  ],
})
export class AppModule {}
