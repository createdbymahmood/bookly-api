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
import { AuthorService } from './author.service';
import { FindAuthorParams } from './dto/author.params.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorService.create(createAuthorDto);
    }
    @Public()
    @Get()
    findAll() {
        return this.authorService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param() params: FindAuthorParams) {
        return this.authorService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindAuthorParams,
        @Body() updateAuthorDto: UpdateAuthorDto,
    ) {
        return this.authorService.update(params.id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param() params: FindAuthorParams) {
        return this.authorService.remove(params.id);
    }
}
