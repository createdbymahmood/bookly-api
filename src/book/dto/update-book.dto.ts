import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsBoolean } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsCategoryIdValid()
    category: string;

    title: string;

    @IsBoolean()
    isPublished: boolean;
}
