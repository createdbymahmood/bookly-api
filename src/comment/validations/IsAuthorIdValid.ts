import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { UserService } from '../../user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAuthorIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}
    async validate(id: string, args: ValidationArguments) {
        return this.userService.findOne(id).then(user => {
            if (user) return true;
            return false;
        });
    }
}

export function IsAuthorIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsAuthorIdValidConstraint,
        });
    };
}
