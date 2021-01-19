import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { Publisher, PublisherSchema } from './publisher.schema';
import { IsPublisherIdValidConstraint } from 'validations/isPublisherIdValid';
import { UserModule } from 'user/user.module';
import { BookModule } from 'book/book.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Publisher.name, schema: PublisherSchema },
        ]),
        forwardRef(() => UserModule),
        forwardRef(() => BookModule),
    ],
    controllers: [PublisherController],
    providers: [PublisherService, IsPublisherIdValidConstraint],
    exports: [PublisherService],
})
export class PublisherModule {}
