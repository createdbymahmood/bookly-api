import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FindCategoryParams } from './dto/category.params.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindCategoryParams) {
        return this.categoryService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindCategoryParams,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoryService.update(params.id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param() params: FindCategoryParams) {
        return this.categoryService.remove(params.id);
    }
}
