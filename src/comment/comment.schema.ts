import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Comment {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    author: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
    book: string;

    @Prop()
    body: string;

    @Prop({ default: false })
    isPublished: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
