import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsBoolean } from 'class-validator';
import { IsImageIdValid } from 'validations/isImageIdValid';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsCategoryIdValid()
    category: string;

    title: string;

    @IsBoolean()
    isPublished: boolean;

    @IsImageIdValid()
    image: string;
}
export class AppendImageToBookDto extends PartialType(CreateBookDto) {
    @IsImageIdValid()
    image: string;
}
