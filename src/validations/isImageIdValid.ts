import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';
import { ImageService } from 'image/image.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsImageIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private imageService: ImageService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.imageService.findOne(id).then(book => {
            if (book) return true;
            return false;
        });
    }
}

export function IsImageIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: 'ImageId not valid',
                ...validationOptions,
            },
            constraints: [],
            validator: IsImageIdValidConstraint,
        });
    };
}
