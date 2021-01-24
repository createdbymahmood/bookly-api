import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { IsUserIdValidConstraint } from 'validations/isUserIdValid';
import { IsEmailExistsConstraint } from 'validations/CheckEmailExistance';
import { CommentModule } from 'comment/comment.module';
import { AuthModule } from 'auth/auth.module';
import { BookModule } from 'book/book.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'auth/constants';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1y' },
        }),
        forwardRef(() => CommentModule),
        forwardRef(() => AuthModule),
        forwardRef(() => BookModule),
    ],
    controllers: [UserController],
    providers: [UserService, IsUserIdValidConstraint, IsEmailExistsConstraint],
    exports: [UserService],
})
export class UserModule {}
