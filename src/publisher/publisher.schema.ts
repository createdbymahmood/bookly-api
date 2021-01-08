import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Publisher {
    @Prop()
    title: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
