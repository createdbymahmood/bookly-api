import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = Category & mongoose.Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Category {
    @Prop()
    title: string;

    @Prop([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ])
    books: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
