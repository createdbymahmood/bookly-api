import { IsNotEmpty, IsMongoId } from 'class-validator';
import { IsBookIdValid } from '../../validations/IsBookIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class CreateCommentDto {
    @IsUserIdValid({
        message: 'Author is not valid',
    })
    author: string;

    @IsBookIdValid({
        message: 'Book is not valid',
    })
    book: string;

    @IsNotEmpty()
    body: string;
}
