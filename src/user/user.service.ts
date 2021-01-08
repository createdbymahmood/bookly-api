import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    create(createUserDto: CreateUserDto) {
        return this.model.create(createUserDto);
    }

    findAll() {
        return this.model.find();
    }

    findOne(_id: string) {
        return this.model.findOne({ _id });
    }

    async update(_id: string, updateUserDto: UpdateUserDto) {
        await this.model.updateOne({ _id }, { $set: updateUserDto });
        return this.findOne(_id);
    }

    remove(_id: string) {
        return this.model.deleteOne({ _id });
    }
}
