import { PartialType } from '@nestjs/mapped-types';
import { IsImageIdValid } from 'validations/isImageIdValid';
import { IsPublisherIdValid } from 'validations/isPublisherIdValid';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name: string;

    @IsImageIdValid()
    image: string;
}

export class FollowPublisherDto {
    @IsPublisherIdValid()
    publisher: string;
}
