import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'user/user.schema';
import { IsPublisherIdValid } from 'validations/isPublisherIdValid';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    image: string;

    @IsOptional()
    biography: string;
}

export class FollowPublisherDto {
    @IsPublisherIdValid()
    publisher: string;
}

export class ChangeRoleDto {
    @IsEnum(Role)
    role: string;
}
