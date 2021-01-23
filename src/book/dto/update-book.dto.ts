import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { IsImageIdValid } from 'validations/isImageIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsOptional()
    @IsCategoryIdValid()
    category: string;

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsBoolean()
    isPublished: boolean;

    @IsOptional()
    @IsImageIdValid()
    image: string;

    @IsOptional()
    @IsOptional()
    @IsUserIdValid()
    author: string;

    @IsOptional()
    @IsNumber()
    releaseYear: number;
}

export class AppendImageToBookDto extends PartialType(CreateBookDto) {
    @IsImageIdValid()
    image: string;
}
