import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { IsUserIdValidConstraint } from 'validations/isUserIdValid';
import { IsAuthorIdValidConstraint } from 'validations/isAuthorIdValid';
import { CommentModule } from 'comment/comment.module';
import { AuthModule } from 'auth/auth.module';
import { BookModule } from 'book/book.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => CommentModule),
        forwardRef(() => AuthModule),
        forwardRef(() => BookModule),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        IsUserIdValidConstraint,
        IsAuthorIdValidConstraint,
    ],
    exports: [UserService],
})
export class UserModule {}
