import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { IsUserIdValidConstraint } from 'validations/isUserIdValid';
import { CommentModule } from 'comment/comment.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => CommentModule),
    ],
    controllers: [UserController],
    providers: [UserService, IsUserIdValidConstraint],
    exports: [UserService],
})
export class UserModule {}
