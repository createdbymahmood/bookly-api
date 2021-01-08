import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* internals */
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './comment.schema';
/* outside services */
import { IsUserIdValidConstraint } from 'validations/isUserIdValid';
import { IsBookIdValidConstraint } from 'validations/IsBookIdValid';
import { IsCommentIdValidConstraint } from 'validations/isCommentIdValid';

import { UserModule } from 'user/user.module';
import { BookModule } from 'book/book.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        UserModule,
        BookModule,
    ],
    controllers: [CommentController],
    providers: [
        CommentService,
        IsUserIdValidConstraint,
        IsBookIdValidConstraint,
        IsCommentIdValidConstraint,
    ],
    exports: [CommentService],
})
export class CommentModule {}
