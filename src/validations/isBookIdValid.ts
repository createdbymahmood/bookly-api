import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { BookService } from '../book/book.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private bookService: BookService) {}
    async validate(id: string, args: ValidationArguments) {
        return this.bookService.findOne(id).then(book => {
            if (book) return true;
            return false;
        });
    }
}

export function IsBookIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsBookIdValidConstraint,
        });
    };
}
