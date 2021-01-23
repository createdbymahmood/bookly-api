import { Module } from '@nestjs/common';

/* modules */
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PublisherModule } from './publisher/publisher.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageModule } from './image/image.module';

/* app */
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
/* helpers */
import { join } from 'path';
import { AuthorModule } from './author/author.module';

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            renderPath: 'image',
        }),
        ConfigModule.forRoot(),
        AuthorModule,
    ],
})
export class AppModule {}
