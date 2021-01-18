import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './image.schema';
import { IsImageIdValidConstraint } from 'validations/isImageIdValid';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    ],
    controllers: [ImageController],
    providers: [ImageService, IsImageIdValidConstraint],
})
export class ImageModule {}
