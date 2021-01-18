import { PartialType } from '@nestjs/mapped-types';
import { IsImageIdValid } from 'validations/isImageIdValid';
import { IsUserIdValid } from 'validations/isUserIdValid';
import { CreatePublisherDto } from './create-publisher.dto';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {
    title: string;
    description: string;
}

export class AttachImageToPublisherDto extends PartialType(CreatePublisherDto) {
    @IsImageIdValid()
    image: string;
}

export class FollowPublisherDto extends PartialType(CreatePublisherDto) {
    @IsUserIdValid()
    userId: string;
}
