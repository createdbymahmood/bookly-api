import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type BookDocument = Book & Mongoose.Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Book {
    @Prop()
    title: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        autopopulate: true,
    })
    category: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
