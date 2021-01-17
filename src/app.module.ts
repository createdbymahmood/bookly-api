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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { ImageModule } from './image/image.module';

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    imports: [
        UserModule,
        CommentModule,
        PublisherModule,
        BookModule,
        CategoryModule,
        MongooseModule.forRoot('mongodb://localhost/bookly'),
        AuthModule,
        ImageModule,
    ],
})
export class AppModule {}
