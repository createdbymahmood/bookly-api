import { IsNotEmpty } from 'class-validator';
import { IsAuthorIdValid } from 'validations/isAuthorIdValid';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';
import { IsPublisherIdValid } from 'validations/isPublisherIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsCategoryIdValid()
    category: string;

    /*  @IsUserIdValid({ message: 'Submitted by who?' })
    submittedBy: string; */

    @IsAuthorIdValid()
    author: string;

    @IsNotEmpty()
    @IsPublisherIdValid()
    publisher: string;
}
