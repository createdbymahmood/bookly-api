import { IsMongoId } from 'class-validator';

export class FindOneCommentParam {
    @IsMongoId()
    id: string;
}
