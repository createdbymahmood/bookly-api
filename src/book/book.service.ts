import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { AppendImageToBookDto, UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { CategoryService } from 'category/category.service';
import { CommentService } from 'comment/comment.service';
import { UserService } from 'user/user.service';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private model: Model<BookDocument>,
        @Inject(CategoryService) private categoryService: CategoryService,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => CommentService))
        private commentService: CommentService,
    ) {}

    get populationOptions() {
        return [
            {
                path: 'category',
                select: 'title',
            },
            {
                path: 'comments',
                select: 'body author',
            },
            {
                path: 'submittedBy',
                select: 'name id',
            },
            {
                path: 'author',
                select: 'name id',
            },
            {
                path: 'image',
            },
        ];
    }

    async create(createBookDto: CreateBookDto) {
        const book = await this.model.create(createBookDto);
        /* @ts-ignore */
        await this.categoryService.appendBook(createBookDto.category, book._id);
        await this.userService.attachBookToAuthor(
            createBookDto.author,
            book._id,
        );
        return book;
    }

    findAll() {
        return this.model.find().lean().populate(this.populationOptions);
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .lean()
            .populate(this.populationOptions);
    }

    async update(_id: string, updateBookDto: UpdateBookDto) {
        await this.model.updateOne({ _id }, { $set: updateBookDto });
        const book = await this.findOne(_id);
        await this.categoryService.appendBook(updateBookDto.category, book._id);
        return book;
    }

    async appendImageToBook(_id: string, updateBookDto: AppendImageToBookDto) {
        await this.model.updateOne({ _id }, { $set: updateBookDto });
        const book = await this.findOne(_id);
        return book;
    }

    appendComment(bookId: string, commentId: string) {
        return this.model.updateOne(
            { _id: bookId },
            /* @ts-ignore */
            { $push: { comments: commentId } },
        );
    }

    detachComment(bookId: string, commentId: string) {
        return this.model.updateOne(
            { _id: bookId },
            /* @ts-ignore */
            { $pull: { comments: commentId } },
        );
    }

    detachCategory(bookId: string, categoryId: string) {
        return this.model.updateOne(
            { _id: bookId },
            /* @ts-ignore */
            { $pull: { category: categoryId } },
        );
    }

    async remove(_id: string) {
        const book = await this.findOne(_id);
        await this.categoryService.detachBook(book.category, book._id);
        await this.userService.detachBookFromAuthor(_id);
        const bookComments = book?.comments;
        if (bookComments?.length) {
            await this.commentService.removeMany(bookComments);
        }
        return this.model.deleteOne({ _id });
    }
}
