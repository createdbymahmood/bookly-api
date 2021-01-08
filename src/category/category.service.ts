import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { BookService } from 'book/book.service';
import { map } from 'lodash/fp';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private model: Model<CategoryDocument>,
        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.model.create(createCategoryDto);
    }

    findAll() {
        return this.model
            .find()
            .select(['_id', 'title'])
            .lean()
            .populate([{ path: 'books', select: 'title' }]);
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .select(['_id', 'title'])
            .lean()
            .populate([{ path: 'books', select: 'title' }]);
    }

    async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
        await this.model.updateOne({ _id }, { $set: updateCategoryDto });
        return this.findOne(_id);
    }

    appendBook(categoryId: string, bookId: string) {
        return this.model.updateOne(
            { _id: categoryId },
            /* @ts-ignore */
            { $addToSet: { books: bookId } },
        );
    }
    detachBook(categoryId: string, bookId: string) {
        return this.model.updateOne(
            { _id: categoryId },
            /* @ts-ignore */
            { $pull: { books: bookId } },
        );
    }
    async remove(_id: string) {
        const category = await this.findOne(_id);
        const categoryBooks = category?.books;

        if (categoryBooks?.length) {
            throw new HttpException(
                'This category contains some books! Sorry! We can not delete it.',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.model.deleteOne({ _id });
        return category;
    }
}
