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
export class IsAuthorIdValidConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
        return this.userService.findOne(id).then(user => {
            /* FIXME why this shit not working ? */
            return user.role === 'AUTHOR';
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
