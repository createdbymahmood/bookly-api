import { IsNotEmpty, IsMongoId } from 'class-validator';
import { IsBookIdValid } from '../../validations/IsBookIdValid';
import { IsAuthorIdValid } from '../../validations/IsAuthorIdValid';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    @IsAuthorIdValid({
        message: 'Author is not valid',
    })
    author: string;

    @IsNotEmpty()
    @IsMongoId()
    @IsBookIdValid({
        message: 'Book is not valid',
    })
    book: string;

    @IsNotEmpty()
    body: string;
}
