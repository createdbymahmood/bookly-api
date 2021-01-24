import { IsNotEmpty } from 'class-validator';
import { IsUserIdValid } from 'validations/isUserIdValid';

export class FindUserParams {
    @IsUserIdValid()
    id: string;
}

export class CheckEmailDto {
    @IsNotEmpty()
    email: string;
}
