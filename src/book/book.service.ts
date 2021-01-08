import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { CategoryService } from 'category/category.service';
import { CommentService } from 'comment/comment.service';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private model: Model<BookDocument>,
        @Inject(CategoryService) private categoryService: CategoryService, // @Inject(CommentService) private commentService: CommentService,
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
        ];
    }
    /* 
    todo ~> R&D what is the best way of doing this
    */
    async create(createBookDto: CreateBookDto) {
        const book = await this.model.create(createBookDto);
        await this.categoryService.appendBook(createBookDto.category, {
            books: book._id,
        });
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

    update(_id: string, updateBookDto: UpdateBookDto) {
        return this.model.updateOne({ _id }, { $set: updateBookDto });
    }

    appendComment(bookId: string, commentId: string) {
        return this.model.updateOne(
            { _id: bookId },
            /* @ts-ignore */
            { $push: { comments: commentId } },
        );
    }

    async remove(_id: string) {
        const book = await this.findOne(_id);
        await this.categoryService.detachBook(book.category, book._id);
        // await this.commentService.remove()
        return this.model.deleteOne({ _id });
    }
}
