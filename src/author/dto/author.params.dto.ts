import { IsAuthorIdValid } from 'validations/isAuthorIdValid';

export class FindAuthorParams {
    @IsAuthorIdValid()
    id: string;
}
