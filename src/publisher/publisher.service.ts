import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import {
    AttachBookToPublisherDto,
    AttachImageToPublisherDto,
    FollowPublisherDto,
    UpdatePublisherDto,
} from './dto/update-publisher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { UserService } from 'user/user.service';
import { BookService } from 'book/book.service';
import { map } from 'lodash/fp';

@Injectable()
export class PublisherService {
    constructor(
        @InjectModel(Publisher.name) private model: Model<PublisherDocument>,

        @Inject(forwardRef(() => UserService)) private userService: UserService,

        @Inject(forwardRef(() => BookService))
        private bookService: BookService,
    ) {}

    create(createPublisherDto: CreatePublisherDto) {
        return this.model.create(createPublisherDto);
    }

    async findAll() {
        return this.model
            .find()
            .lean()
            .populate([
                { path: 'image' },
                { path: 'followers', select: 'name _id' },
                { path: 'books' },
            ]);
    }

    findOne(_id: string) {
        return this.model
            .findOne({ _id })
            .lean()
            .populate('image followers books');
    }

    async update(_id: string, updatePublisherDto: UpdatePublisherDto) {
        await this.model.updateOne({ _id }, { $set: updatePublisherDto });
        return this.findOne(_id);
    }

    async follow(_id: string, followDto: FollowPublisherDto) {
        await this.userService.followPublisher(followDto.userId, {
            publisher: _id,
        });

        await this.model.updateOne(
            { _id },
            { $addToSet: { followers: followDto.userId } },
        );
        return this.findOne(_id);
    }

    async unfollow(_id: string, unfollowDto: FollowPublisherDto) {
        await this.userService.unfollowPublisher(unfollowDto.userId, {
            publisher: _id,
        });

        await this.model.updateOne(
            { _id },
            { $pull: { followers: unfollowDto.userId } },
        );
        return this.findOne(_id);
    }

    public async attachImageToPublisher(
        _id: string,
        attachImageToPublisher: AttachImageToPublisherDto,
    ) {
        await this.model.updateOne(
            { _id },
            { $set: { image: attachImageToPublisher.image } },
        );
        return this.findOne(_id);
    }

    public attachBookToPublisher(_id: string, bookId: string) {
        return this.model.updateOne({ _id }, { $push: { books: bookId } });
    }

    public async detachBookFromPublisher(publisherId: string, bookId: string) {
        await this.model.updateOne(
            { _id: publisherId },
            { $pull: { books: bookId } },
        );
        return this.findOne(bookId);
    }

    public async remove(_id: string, unfollowDto: FollowPublisherDto) {
        const publisher = await this.findOne(_id);
        /* FIXME this part is not working, checkout why ? 
        more details: when we delete a publisher, the publisherId must be deAttached 
        from the users following object
        */
        await this.userService.detachPublisher(unfollowDto.userId, _id);
        map(
            async (publisherId: string) =>
                await this.bookService.remove(publisherId),
        )(publisher.books);
        return this.model.deleteOne({ _id });
    }
}
