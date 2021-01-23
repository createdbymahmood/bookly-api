import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsAuthorIdValid } from 'validations/isAuthorIdValid';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsPublisherIdValid } from 'validations/isPublisherIdValid';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsCategoryIdValid()
    category: string;

    @IsNotEmpty()
    description: string;

    @IsAuthorIdValid()
    author: string;

    @IsNumber()
    releaseYear: number;

    @IsNotEmpty()
    @IsPublisherIdValid()
    publisher: string;
}
