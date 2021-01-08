import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
/* entities */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PublisherModule } from './publisher/publisher.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        UserModule,
        CommentModule,
        PublisherModule,
        BookModule,
        CategoryModule,
        MongooseModule.forRoot('mongodb://localhost/bookly'),
        AuthModule,
    ],
})
export class AppModule {}
