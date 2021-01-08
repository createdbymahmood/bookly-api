import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { BookService } from 'book/book.service';
import * as Mongoose from 'mongoose';
import { UserService } from 'user/user.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private model: Model<CommentDocument>,
        @Inject(BookService) private bookService: BookService,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
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
        await this.userService.appendComment(comment.author, comment._id);
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

    removeMany(commentIds: string[]) {
        return this.model.deleteMany({
            _id: {
                $in: commentIds,
            },
        });
    }

    async remove(_id: string) {
        const comment = await this.findOne(_id);
        await this.bookService.detachComment(comment.book, comment._id);
        await this.userService.detachComment(comment.author, comment._id);
        await this.model.deleteOne({ _id });
        return comment;
    }
}
