import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type PublisherDocument = Publisher & Mongoose.Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Publisher {
    @Prop({ required: true })
    title: string;

    @Prop({
        required: true,
        default:
            'Default publisher description, If you see this, something must have gone wrong!',
    })
    description: string;

    @Prop({
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false,
    })
    image: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
