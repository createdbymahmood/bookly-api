import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image, ImageDocument } from './image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image.name) private model: Model<ImageDocument>) {}

    create(createImageDto: CreateImageDto) {
        return this.model.create(createImageDto);
    }

    findAll() {
        return this.model.find();
    }

    findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    update(_id: number, updateImageDto: UpdateImageDto) {
        return `This action updates a #${_id} image`;
    }

    remove(_id: number) {
        return `This action removes a #${_id} image`;
    }
}
