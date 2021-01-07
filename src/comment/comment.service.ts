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

    create(createCommentDto: CreateCommentDto) {
        return this.model.create(createCommentDto);
    }

    findAll() {
        return this.model.find().populate(['author', 'book']);
    }

    findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    update(_id: string, updateCommentDto: UpdateCommentDto) {
        return this.model.updateOne({ _id }, { $set: updateCommentDto });
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
