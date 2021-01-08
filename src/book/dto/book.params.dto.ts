import { IsBookIdValid } from 'validations/isBookIdValid';

export class FindBookParams {
    @IsBookIdValid()
    id: string;
}
