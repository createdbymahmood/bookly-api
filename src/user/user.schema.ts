import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type UserDocument = User & Mongoose.Document;

export enum Role {
    ADMIN,
    USER,
    AUTHOR,
}
@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({ enum: ['ADMIN', 'AUTHOR', 'USER'], default: 'USER' })
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

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ])
    books: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
