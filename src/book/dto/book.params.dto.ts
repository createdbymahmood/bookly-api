import { IsBookIdValid } from 'validations/isBookIdValid';

export class FindBookParams {
    @IsBookIdValid({
        message: 'Book not valid',
    })
    id: string;
}
