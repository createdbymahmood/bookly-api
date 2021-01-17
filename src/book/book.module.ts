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
        MongooseModule.forFeatureAsync([
            {
                name: Book.name,
                useFactory: () => {
                    const schema = BookSchema;
                    schema.pre('find', function () {
                        this.lean().populate('submittedBy', 'name _id');
                    });
                    return schema;
                },
            },
        ]),
        CategoryModule,
        forwardRef(() => CommentModule),
    ],
    controllers: [BookController],
    providers: [BookService, IsCategoryIdValidConstraint],
    exports: [BookService],
})
export class BookModule {}
