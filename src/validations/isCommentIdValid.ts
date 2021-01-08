import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isMongoId,
} from 'class-validator';
import { CommentService } from '../comment/comment.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCommentIdValidConstraint
    implements ValidatorConstraintInterface {
    constructor(private commentService: CommentService) {}
    async validate(id: string, args: ValidationArguments) {
        if (!isMongoId(id)) {
            return false;
        }
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
            options: {
                message: 'CommentId not valid',
                ...validationOptions,
            },
            constraints: [],
            validator: IsCommentIdValidConstraint,
        });
    };
}
