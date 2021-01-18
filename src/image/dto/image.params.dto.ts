import { IsImageIdValid } from 'validations/isImageIdValid';

export class FindImageParams {
    @IsImageIdValid()
    id: string;
}
