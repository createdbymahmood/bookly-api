import { IsUserIdValid } from 'validations/isUserIdValid';

export class FindUserParams {
    @IsUserIdValid()
    id: string;
}
