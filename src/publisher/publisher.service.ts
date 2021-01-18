import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import {
    AttachImageToPublisherDto,
    UpdatePublisherDto,
} from './dto/update-publisher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher, PublisherDocument } from './publisher.schema';

@Injectable()
export class PublisherService {
    constructor(
        @InjectModel(Publisher.name) private model: Model<PublisherDocument>,
    ) {}

    create(createPublisherDto: CreatePublisherDto) {
        return this.model.create(createPublisherDto);
    }

    findAll() {
        return this.model.find().populate('image');
    }

    findOne(_id: string) {
        return this.model.findOne({ _id }).populate('image');
    }

    async update(_id: string, updatePublisherDto: UpdatePublisherDto) {
        await this.model.updateOne({ _id }, { $set: updatePublisherDto });
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
    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
