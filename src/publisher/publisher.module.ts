import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { Publisher, PublisherSchema } from './publisher.schema';
import { IsPublisherIdValidConstraint } from 'validations/isPublisherIdValid';
import { UserModule } from 'user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Publisher.name, schema: PublisherSchema },
        ]),
        UserModule,
    ],
    controllers: [PublisherController],
    providers: [PublisherService, IsPublisherIdValidConstraint],
})
export class PublisherModule {}
