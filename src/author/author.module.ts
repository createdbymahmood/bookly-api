import { forwardRef, Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { IsAuthorIdValidConstraint } from 'validations/isAuthorIdValid';
import { BookModule } from 'book/book.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Author.name, schema: AuthorSchema },
        ]),
        forwardRef(() => BookModule),
    ],
    controllers: [AuthorController],
    providers: [AuthorService, IsAuthorIdValidConstraint],
    exports: [AuthorService],
})
export class AuthorModule {}
