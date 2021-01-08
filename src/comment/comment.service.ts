import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private model: Model<CommentDocument>,
    ) {}

    get populationOptions() {
        return [
            { path: 'book', select: 'title _id' },
            { path: 'author', select: 'name _id' },
        ];
    }
    create(createCommentDto: CreateCommentDto) {
        return this.model.create(createCommentDto);
    }

    findAll() {
        return this.model
            .find()
            .populate(this.populationOptions)
            .lean()
            .select('isPublished _id body');
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .populate(this.populationOptions)
            .lean()
            .select('isPublished _id body');
    }

    update(_id: string, updateCommentDto: UpdateCommentDto) {
        return this.model.updateOne({ _id }, { $set: updateCommentDto });
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
