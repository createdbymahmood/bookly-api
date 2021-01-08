import { IsNotEmpty } from 'class-validator';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsCategoryIdValid({
        message: 'Category is not valid',
    })
    category: string;
}
