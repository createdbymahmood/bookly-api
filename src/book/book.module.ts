import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './book.schema';
import { IsCategoryIdValidConstraint } from 'validations/isCategoryIdValid';
import { CategoryModule } from 'category/category.module';
import { CommentModule } from 'comment/comment.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
        CategoryModule,
        forwardRef(() => CommentModule),
    ],
    controllers: [BookController],
    providers: [BookService, IsCategoryIdValidConstraint],
    exports: [BookService],
})
export class BookModule {}
