import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PublisherService } from './publisher/publisher.service';
import { PublisherController } from './publisher/publisher.controller';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    PublisherController,
    CommentController,
    BookController,
    CategoryController,
  ],
  providers: [
    AppService,
    UserService,
    PublisherService,
    CommentService,
    BookService,
    CategoryService,
  ],
})
export class AppModule {}
