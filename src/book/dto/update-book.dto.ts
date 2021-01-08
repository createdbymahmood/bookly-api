import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsCategoryIdValid } from 'validations/isCategoryIdValid';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsCategoryIdValid()
    category: string;

    title: string;
}
