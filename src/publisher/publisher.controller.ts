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
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { FindPublisherParams } from './dto/publisher.params.dto';

@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) {}

    @Post()
    create(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publisherService.create(createPublisherDto);
    }

    @Get()
    findAll() {
        return this.publisherService.findAll();
    }

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

    @Delete(':id')
    remove(@Param() params: FindPublisherParams) {
        return this.publisherService.remove(params.id);
    }
}
