import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { BookService } from 'book/book.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private model: Model<CommentDocument>,
        @Inject(BookService) private bookService: BookService,
    ) {}

    get populationOptions() {
        return [
            { path: 'book', select: 'title _id' },
            { path: 'author', select: 'name _id' },
        ];
    }

    async create(createCommentDto: CreateCommentDto) {
        const comment = await this.model.create(createCommentDto);
        await this.bookService.appendComment(comment.book, comment._id);
        return comment;
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

    async update(_id: string, updateCommentDto: UpdateCommentDto) {
        await this.model.updateOne({ _id }, { $set: updateCommentDto });
        return this.findOne(_id);
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
