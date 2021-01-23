import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './book.schema';
import { IsCategoryIdValidConstraint } from 'validations/isCategoryIdValid';
import { CategoryModule } from 'category/category.module';
import { CommentModule } from 'comment/comment.module';
import { UserModule } from 'user/user.module';
import { PublisherModule } from 'publisher/publisher.module';
import { AuthorModule } from 'author/author.module';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Book.name,
                useFactory: () => {
                    const schema = BookSchema;
                    schema.pre('find', function () {
                        this.lean().populate([
                            'submittedBy',
                            'publisher',
                            'author',
                            'category',
                            'image',
                        ]);
                    });
                    return schema;
                },
            },
        ]),
        forwardRef(() => CategoryModule),
        forwardRef(() => CommentModule),
        forwardRef(() => UserModule),
        forwardRef(() => PublisherModule),
        forwardRef(() => AuthorModule),
    ],
    controllers: [BookController],
    providers: [BookService, IsCategoryIdValidConstraint],
    exports: [BookService],
})
export class BookModule {}
