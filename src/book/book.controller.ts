import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { Public } from 'auth/auth-public';
import { Roles } from 'modules/roles.guard';
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

    @Public()
    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Public()
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
