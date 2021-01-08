import { IsMongoId } from 'class-validator';
import { IsCommentIdValid } from 'validations/isCommentIdValid';

export class FindCommentParam {
    @IsMongoId()
    @IsCommentIdValid()
    id: string;
}
