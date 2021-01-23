import { Injectable } from '@nestjs/common';
import { AuthorService } from 'author/author.service';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAuthorIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private authorService: AuthorService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.authorService.findOne(id).then(author => {
            if (author) {
                return true;
            }
            return false;
        });
    }
}

export function IsAuthorIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message:
                    'author not valid or the provided userId is not author',
                ...validationOptions,
            },
            constraints: [],
            validator: IsAuthorIdValidConstraint,
        });
    };
}
