import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import {
    AttachImageToPublisherDto,
    UpdatePublisherDto,
} from './dto/update-publisher.dto';
import { FindPublisherParams } from './dto/publisher.params.dto';
import { Public } from 'auth/auth-public';

@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) {}

    @Post()
    create(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publisherService.create(createPublisherDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.publisherService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param() params: FindPublisherParams) {
        return this.publisherService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindPublisherParams,
        @Body() updatePublisherDto: UpdatePublisherDto,
    ) {
        return this.publisherService.update(params.id, updatePublisherDto);
    }
    @Put('attach-image/:id')
    attachImage(
        @Param() params: FindPublisherParams,
        @Body() attachImageToPublisherBody: AttachImageToPublisherDto,
    ) {
        return this.publisherService.attachImageToPublisher(
            params.id,
            attachImageToPublisherBody,
        );
    }
    @Delete(':id')
    remove(@Param() params: FindPublisherParams) {
        return this.publisherService.remove(params.id);
    }
}
