import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';
import { PublisherService } from '../publisher/publisher.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPublisherIdValidConstraint
    implements ValidatorConstraintInterface {
    constructor(private publisherService: PublisherService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.publisherService.findOne(id).then(publisher => {
            if (publisher) return true;
            return false;
        });
    }
}

export function IsPublisherIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: 'PublisherId not valid',
                ...validationOptions,
            },
            constraints: [],
            validator: IsPublisherIdValidConstraint,
        });
    };
}
