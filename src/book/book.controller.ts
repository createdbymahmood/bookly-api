import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Req,
    Request,
} from '@nestjs/common';
import { Public } from 'auth/auth-public';
import { omit } from 'lodash';
import { merge } from 'lodash/fp';
import { User } from 'user/user.schema';
import { BookService } from './book.service';
import { FindBookParams } from './dto/book.params.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { AppendImageToBookDto, UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    public create(@Body() createBookDto: CreateBookDto, @Request() req) {
        return this.bookService.create(
            merge(createBookDto, { submittedBy: req?.user?.id }),
        );
        /*  return this.bookService.create({
            ...createBookDto,
            submittedBy: req?.user?.id,
        }); */
    }

    @Public()
    @Get()
    findAll(@Request() req) {
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

    @Put('attach-image/:id')
    appendImageToBook(
        @Param() params: FindBookParams,
        @Body() updateBookDto: AppendImageToBookDto,
    ) {
        return this.bookService.appendImageToBook(params.id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param() params: FindBookParams) {
        return this.bookService.remove(params.id);
    }
}
