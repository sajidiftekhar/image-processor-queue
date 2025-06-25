// image/image.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { ImageJob } from './image.job';

@Processor('image')
export class ImageProcessor {
  @Process('process')
  async handleProcess(job: Job<ImageJob>) {
    const outputDir = './processed';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const input = job.data.path;
    const output = path.join(outputDir, `processed-${job.data.filename}`);

    await sharp(input).resize(300, 300).toFile(output);
    console.log(`Processed file: ${output}`);
  }
}
