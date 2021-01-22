import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsBookIdValid } from 'validations/isBookIdValid';
import { IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    title?: string;

    @IsBookIdValid()
    @IsOptional()
    books: string[];
}
