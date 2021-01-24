import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailExistsConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}
    async validate(email: string, args: ValidationArguments) {
        return this.userService.findOneByEmail(email).then(user => {
            if (user) return false;
            return true;
        });
    }
}

export function IsEmailExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailExistsConstraint,
        });
    };
}
