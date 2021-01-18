import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Readable } from 'stream';

export type ImageDocument = Image & mongoose.Document;

const HOST = 'http://localhost:3000';
@Schema({
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
})
export class Image {
    @Prop()
    /** Name of the form field associated with this file. */
    fieldname: string;
    @Prop()
    /** Name of the file on the uploader's computer. */
    originalname: string;
    /**
     * Value of the `Content-Transfer-Encoding` header for this file.
     * @deprecated since July 2015
     * @see RFC 7578, Section 4.7
     */ @Prop()
    encoding: string;
    /** Value of the `Content-Type` header for this file. */
    @Prop()
    mimetype: string;
    /** Size of the file in bytes. */
    @Prop()
    size: number;

    /** `DiskStorage` only: Directory to which this file has been uploaded. */
    @Prop()
    destination: string;
    /** `DiskStorage` only: Name of this file within `destination`. */
    @Prop()
    filename: string;
    /** `DiskStorage` only: Full path to the uploaded file. */
    @Prop()
    path: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

ImageSchema.set('toObject', { virtuals: true });
ImageSchema.set('toJSON', { virtuals: true });

ImageSchema.virtual('src').get(function () {
    return `${HOST}/${this.filename}`;
});
