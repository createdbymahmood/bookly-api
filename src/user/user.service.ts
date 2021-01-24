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
import { BookService } from 'book/book.service';
import * as bcrypt from 'bcrypt';
import { merge, omit } from 'lodash/fp';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private model: Model<UserDocument>,
        @Inject(forwardRef(() => CommentService))
        private commentService: CommentService,

        private jwtService: JwtService,

        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
    ) {}

    get populationOptions() {
        return [
            { path: 'comments', select: 'body book' },
            { path: 'following', select: 'title image' },
            { path: 'books' },
            { path: 'image' },
        ];
    }

    public async create(createUserDto: CreateUserDto) {
        const password = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.model.create(
            merge({ password })(omit('password')(createUserDto)),
        );

        /* ّFIXME use the authService Module */
        const payload = {
            email: user.email,
            password: user.password,
            sub: user._id,
        };

        return {
            userId: user._id,
            role: user.role,
            token: this.jwtService.sign(payload),
        };
    }

    public async checkEmail(email: string) {
        const user = await this.model.findOne({ email });
        return Boolean(user);
    }

    findAll() {
        return this.model
            .find()
            .lean()
            .populate(this.populationOptions)
            .select('-password');
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .lean()
            .populate(this.populationOptions)
            .select('-password');
    }

    findOneByEmail(email: string) {
        return this.model
            .findOne({ email })
            .lean()
            .populate(this.populationOptions);
    }

    findAuthors() {
        return this.model
            .find({ role: 'AUTHOR' })
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

    public attachBookToAuthor(userId: string, bookId: string) {
        return this.model.updateOne(
            { _id: userId },
            { $addToSet: { books: bookId } },
        );
    }

    async remove(_id: string) {
        /* FIXME detach userID from publisher followers */
        const user = await this.findOne(_id);

        /* remove all comments related to this user */
        await this.commentService.removeMany(user.comments);

        await this.model.deleteOne({ _id });
        return user;
    }
}
