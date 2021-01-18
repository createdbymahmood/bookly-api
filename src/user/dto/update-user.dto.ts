import { PartialType } from '@nestjs/mapped-types';
import { IsImageIdValid } from 'validations/isImageIdValid';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;

    @IsImageIdValid()
    image: string;
}
