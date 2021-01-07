import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
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
        return this.model.find();
    }

    findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    update(_id: string, updatePublisherDto: UpdatePublisherDto) {
        return this.model.updateOne({ _id }, { $set: updatePublisherDto });
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
