import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type UserDocument = User & Mongoose.Document;

export enum Role {
    ADMIN,
    USER,
}
@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    @Prop()
    name: string;

    @Prop({ enum: ['ADMIN', 'USER'], default: 'USER' })
    role: string;

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

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Publisher',
        },
    ])
    following: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
