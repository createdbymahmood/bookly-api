import { IsNotEmpty } from 'class-validator';

export class CreatePublisherDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
