import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { IsCategoryIdValidConstraint } from 'validations/isCategoryIdValid';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, IsCategoryIdValidConstraint],
    exports: [CategoryService],
})
export class CategoryModule {}
