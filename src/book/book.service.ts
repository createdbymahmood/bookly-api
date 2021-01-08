import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { CategoryService } from 'category/category.service';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private model: Model<BookDocument>,
        @Inject(CategoryService) private categoryService: CategoryService,
    ) {}

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
        return this.model.find().lean().populate('category', 'title');
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .lean()
            .populate('category', '_id title');
    }

    update(_id: string, updateBookDto: UpdateBookDto) {
        return this.model.updateOne({ _id }, { $set: updateBookDto });
    }

    async remove(_id: string) {
        const book = await this.findOne(_id);
        await this.categoryService.detachBook(book.category, book._id);
        return this.model.deleteOne({ _id });
    }
}
