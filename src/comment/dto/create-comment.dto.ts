import { IsNotEmpty } from 'class-validator';
import { IsBookIdValid } from '../../validations/IsBookIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class CreateCommentDto {
    @IsBookIdValid({
        message: 'Book is not valid',
    })
    book: string;

    @IsNotEmpty()
    body: string;
}
