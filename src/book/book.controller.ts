import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { FindBookParams } from './dto/book.params.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindBookParams) {
        return this.bookService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindBookParams,
        @Body() updateBookDto: UpdateBookDto,
    ) {
        return this.bookService.update(params.id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param() params: FindBookParams) {
        return this.bookService.remove(params.id);
    }
}
