import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* internals */
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './comment.schema';
/* outside services */
import { IsAuthorIdValidConstraint } from 'validations/IsAuthorIdValid';
import { IsBookIdValidConstraint } from 'validations/IsBookIdValid';
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
        IsAuthorIdValidConstraint,
        IsBookIdValidConstraint,
    ],
    exports: [CommentService],
})
export class CommentModule {}
