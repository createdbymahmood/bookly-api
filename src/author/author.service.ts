import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from './author.schema';
import { BookService } from 'book/book.service';

@Injectable()
export class AuthorService {
    constructor(
        @InjectModel(Author.name) private model: Model<AuthorDocument>,

        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
    ) {}

    create(dto: CreateAuthorDto) {
        return this.model.create(dto);
    }

    findAll() {
        return this.model
            .find()
            .lean()
            .populate('books')
            .select('title isPublished author');
    }

    findOne(id: string) {
        return this.model
            .findById(id)
            .lean()
            .populate('books')
            .select('title isPublished author');
    }

    update(_id: string, updateAuthorDto: UpdateAuthorDto) {
        return this.model.updateOne({ _id }, { $set: updateAuthorDto });
    }

    public async remove(_id: string) {
        const author = await this.findOne(_id);
        await this.bookService.removeMany(author?.books);
        return this.model.deleteOne({ _id });
    }

    attachBookToAuthor(authorId: string, bookId: string) {
        return this.model.updateOne(
            { _id: authorId },
            { $addToSet: { books: bookId } },
        );
    }

    public async detachBookFromAuthor(bookId: string) {
        const users = await this.findAll();
        await this.model.updateMany(
            { _id: { $in: users.map(user => user._id) } },
            { $pull: { books: bookId } },
            { multi: true },
        );
    }
}
