import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    ) {}

    create(createBookDto: CreateBookDto) {
        return this.bookModel.create(createBookDto);
    }

    findAll() {
        return this.bookModel.find();
    }

    findOne(_id: string) {
        return this.bookModel.findOne({ _id });
    }

    update(_id: string, updateBookDto: UpdateBookDto) {
        return this.bookModel.updateOne({ _id }, { $set: updateBookDto });
    }

    remove(_id: string) {
        return this.bookModel.deleteOne({ _id });
    }
}
