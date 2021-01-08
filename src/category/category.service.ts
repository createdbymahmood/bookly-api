import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private model: Model<CategoryDocument>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.model.create(createCategoryDto);
    }

    findAll() {
        return this.model
            .find()
            .select(['_id', 'title'])
            .lean()
            .populate('books', 'title, books');
    }

    findOne(_id: string) {
        return this.model.findOne({ _id }).select(['_id', 'title']);
    }

    update(_id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.model.updateOne({ _id }, { $set: updateCategoryDto });
    }

    appendBook(_id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.model.updateOne(
            { _id },
            /* @ts-ignore */
            { $push: { books: updateCategoryDto.books } },
        );
    }
    detachBook(categoryId: string, bookId: string) {
        return this.model.updateOne(
            { _id: categoryId },
            /* @ts-ignore */
            { $pull: { books: bookId } },
        );
    }
    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
