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
import {
    AnyFilesInterceptor,
    FileInterceptor,
    MulterModule,
} from '@nestjs/platform-express';
import { extname } from 'path';

function generateFilename(file) {
    return `${Date.now()}.${extname(file.originalname)}`;
}

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(
        AnyFilesInterceptor({
            dest: './uploads',
            storage: {
                filename: (req, file, callback) => {
                    callback(null, generateFilename(file));
                },
            },
        }),
    )
    uploadFile(@UploadedFiles() files) {
        return files;
    }

    @Get()
    findAll() {
        return this.imageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imageService.findOne(+id);
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
