import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

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
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
