import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    author: string;

    @IsNotEmpty()
    @IsMongoId()
    book: string;

    @IsNotEmpty()
    body: string;
}
