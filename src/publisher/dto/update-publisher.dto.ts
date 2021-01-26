import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { IsBookIdValid } from 'validations/IsBookIdValid';
import { IsImageIdValid } from 'validations/isImageIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';
import { CreatePublisherDto } from './create-publisher.dto';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {
    @IsOptional()
    title: string;

    @IsOptional()
    description: string;
}

export class AttachImageToPublisherDto extends PartialType(CreatePublisherDto) {
    @IsImageIdValid()
    image: string;
}

export class AttachBookToPublisherDto extends PartialType(CreatePublisherDto) {
    @IsBookIdValid()
    book: string;
}

export class FollowPublisherDto extends PartialType(CreatePublisherDto) {
    @IsUserIdValid()
    userId: string;
}
