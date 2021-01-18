import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type UserDocument = User & Mongoose.Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    @Prop()
    name: string;

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ])
    comments: string[];

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ])
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
