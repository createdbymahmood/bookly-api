import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CommentService } from 'comment/comment.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private model: Model<UserDocument>,
        @Inject(forwardRef(() => CommentService))
        private commentService: CommentService,
    ) {}

    get populationOptions() {
        return [{ path: 'comments', select: 'body book' }];
    }

    create(createUserDto: CreateUserDto) {
        return this.model.create(createUserDto);
    }

    findAll() {
        return this.model.find().lean().populate(this.populationOptions);
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .lean()
            .populate(this.populationOptions);
    }

    findOneByName(name: string) {
        return this.model
            .findOne({ name })
            .lean()
            .populate(this.populationOptions);
    }

    async update(_id: string, updateUserDto: UpdateUserDto) {
        await this.model.updateOne({ _id }, { $set: updateUserDto });
        return this.findOne(_id);
    }

    appendComment(userId: string, commentId: string) {
        return this.model.updateOne(
            { _id: userId },
            { $addToSet: { comments: commentId } },
        );
    }

    detachComment(userId: string, commentId: string) {
        return this.model.updateOne(
            { _id: userId },
            { $pull: { comments: commentId } },
        );
    }

    async remove(_id: string) {
        const user = await this.findOne(_id);
        await this.commentService.removeMany(user.comments);
        await this.model.deleteOne({ _id });
        return user;
    }
}
