import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { BackoffOptions, Queue } from 'bull';
import type { ImageJob } from './image.job';

@Injectable()
export class ImageService {
  constructor(@InjectQueue('image') private imageQueue: Queue<ImageJob>) {}

  async queueImages(files: Express.Multer.File[]) {
    const jobs = files.map((file) => {
      const job: ImageJob = {
        path: file.path,
        filename: file.filename,
      };
      return this.imageQueue.add('process', job, {
        attempts: 3,
        backoff: ((attemptsMade: number, err: Error) => {
          console.log(err.name, err.message);
          return 5000 * Math.pow(2, attemptsMade - 1);
        }) as unknown as BackoffOptions,
      });
    });
    return Promise.all(jobs);
  }
}
