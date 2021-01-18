import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
    UpdateUserDto,
    FollowPublisherDto,
    ChangeRoleDto,
} from './dto/update-user.dto';
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
        return [
            { path: 'comments', select: 'body book' },
            { path: 'following', select: 'title image' },
        ];
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

    public async update(_id: string, updateUserDto: UpdateUserDto) {
        await this.model.updateOne({ _id }, { $set: updateUserDto });
        return this.findOne(_id);
    }

    public async changeRole(_id: string, changeRole: ChangeRoleDto) {
        await this.model.updateOne(
            { _id },
            { $set: { role: changeRole.role } },
        );
        return this.findOne(_id);
    }

    public async followPublisher(
        _id: string,
        followPublisherDto: FollowPublisherDto,
    ) {
        await this.model.updateOne(
            { _id },
            { $addToSet: { following: followPublisherDto.publisher } },
        );
        return this.findOne(_id);
    }

    public async unfollowPublisher(
        _id: string,
        unfollowDto: FollowPublisherDto,
    ) {
        await this.model.updateOne(
            { _id },
            { $pull: { following: unfollowDto.publisher } },
        );
        return this.findOne(_id);
    }

    public async detachPublisher(userId: string, publisherId: string) {
        const users = await this.findAll();

        await this.model.updateMany(
            { _id: { $in: users.map(user => user._id) } },
            { $pull: { following: publisherId } },
            { multi: true },
        );

        return this.findOne(userId);
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
        /* FIXME detach userID from publisher followers */
        const user = await this.findOne(_id);
        await this.commentService.removeMany(user.comments);
        await this.model.deleteOne({ _id });
        return user;
    }
}
