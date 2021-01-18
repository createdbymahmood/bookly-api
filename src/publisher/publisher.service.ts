import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import {
    AttachImageToPublisherDto,
    FollowPublisherDto,
    UpdatePublisherDto,
} from './dto/update-publisher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';
import { UserService } from 'user/user.service';

@Injectable()
export class PublisherService {
    constructor(
        @InjectModel(Publisher.name) private model: Model<PublisherDocument>,
        @Inject(UserService) private userService: UserService,
    ) {}

    create(createPublisherDto: CreatePublisherDto) {
        return this.model.create(createPublisherDto);
    }

    findAll() {
        return this.model
            .find()
            .populate([
                { path: 'image' },
                { path: 'followers', select: 'name _id' },
            ]);
    }

    findOne(_id: string) {
        return this.model.findOne({ _id }).populate('image');
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

    public async remove(_id: string, unfollowDto: FollowPublisherDto) {
        await this.userService.unfollowPublisher(unfollowDto.userId, {
            publisher: _id,
        });

        return this.model.deleteOne({ _id });
    }
}
