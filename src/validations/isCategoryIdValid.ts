import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';
import { CategoryService } from 'category/category.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoryIdValidConstraint
    implements ValidatorConstraintInterface {
    constructor(private categoryService: CategoryService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.categoryService.findOne(id).then(category => {
            if (category) return true;
            return false;
        });
    }
}

export function IsCategoryIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: 'CategoryId not valid',
                ...validationOptions,
            },
            constraints: [],
            validator: IsCategoryIdValidConstraint,
        });
    };
}
