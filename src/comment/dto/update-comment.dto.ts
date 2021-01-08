import { IsBoolean } from 'class-validator';
export class UpdateCommentDto {
    @IsBoolean()
    isPublished: boolean;
}
