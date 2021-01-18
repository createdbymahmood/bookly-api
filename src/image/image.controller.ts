import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
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

    @Put(':id')
    update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
        return this.imageService.update(+id, updateImageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imageService.remove(+id);
    }
}
