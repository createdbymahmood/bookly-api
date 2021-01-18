import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'auth/auth-public';
import { FindImageParams } from './dto/image.params.dto';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(AnyFilesInterceptor())
    public async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        files.map(async file => {
            await this.imageService.create(file);
        });
        return files;
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
