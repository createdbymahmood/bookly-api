import { IsNotEmpty } from 'class-validator';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsCategoryIdValid()
    category: string;

    @IsUserIdValid()
    author: string;
}
