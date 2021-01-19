import { IsNotEmpty } from 'class-validator';
import { IsAuthorIdValid } from 'validations/isAuthorIdValid';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsCategoryIdValid()
    category: string;

    @IsUserIdValid({ message: 'Submitted by who?' })
    submittedBy: string;

    @IsAuthorIdValid()
    author: string;
}
