import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image, ImageDocument } from './image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image.name) private model: Model<ImageDocument>) {}

    create(createImageDto: CreateImageDto) {
        return this.model.create(createImageDto);
    }

    public findAll() {
        return this.model.find();
    }

    public findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    public async remove(_id: string) {
        const image = await this.findOne(_id);
        await this.model.deleteOne({ _id });
        return image;
    }

    public async removeMany(imageIds: string[]) {
        return this.model.deleteMany({
            _id: {
                $in: imageIds,
            },
        });
    }
}
