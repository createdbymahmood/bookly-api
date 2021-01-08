import { IsMongoId } from 'class-validator';
import { IsPublisherIdValid } from 'validations/isPublisherIdValid';

export class FindPublisherParams {
    @IsMongoId()
    @IsPublisherIdValid()
    id: string;
}
