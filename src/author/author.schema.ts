import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type AuthorDocument = Author & Mongoose.Document;

@Schema({
    versionKey: false,
    timestamps: true,
})
export class Author {
    @Prop()
    name: string;

    @Prop([
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ])
    books: string[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
