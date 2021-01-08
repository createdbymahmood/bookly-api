import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.userService.findOne(id).then(user => {
            if (user) return true;
            return false;
        });
    }
}

export function IsUserIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: 'UserId not valid',
                ...validationOptions,
            },
            constraints: [],
            validator: IsUserIdValidConstraint,
        });
    };
}
