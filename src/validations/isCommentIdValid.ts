import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { CommentService } from '../comment/comment.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCommentIdValidConstraint
    implements ValidatorConstraintInterface {
    constructor(private commentService: CommentService) {}
    async validate(id: string, args: ValidationArguments) {
        return this.commentService.findOne(id).then(comment => {
            if (comment) return true;
            return false;
        });
    }
}

export function IsCommentIdValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCommentIdValidConstraint,
        });
    };
}
