import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type BookDocument = Book & Mongoose.Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({
        default: false,
    })
    isPublished: boolean;

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ])
    comments: string[];

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    })
    category: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    submittedBy: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false,
    })
    image: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
    })
    author: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: false,
    })
    publisher: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Number })
    releaseYear: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
