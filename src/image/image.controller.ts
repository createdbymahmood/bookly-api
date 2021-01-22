import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'auth/auth-public';
import { FindImageParams } from './dto/image.params.dto';
import * as Mongoose from 'mongoose';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    public async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.imageService.create(file);
    }

    @Public()
    @Get()
    findAll() {
        return this.imageService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param() params: FindImageParams) {
        return this.imageService.findOne(params.id);
    }

    @Delete(':id')
    remove(@Param() params: FindImageParams) {
        return this.imageService.remove(params.id);
    }
}
