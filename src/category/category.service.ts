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
        return this.model.find();
    }

    findOne(id: number) {
        return this.model.findOne({ id });
    }

    update(_id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.model.updateOne({ _id }, { $set: updateCategoryDto });
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
