import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PublisherModule } from './publisher/publisher.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, CommentModule, PublisherModule, BookModule, CategoryModule],
})
export class AppModule {}
