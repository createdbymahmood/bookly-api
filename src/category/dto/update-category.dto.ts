import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsBookIdValid } from 'validations/isBookIdValid';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    title?: string;

    @IsBookIdValid()
    books: string[];
}
