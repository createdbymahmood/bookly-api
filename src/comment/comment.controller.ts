import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Req,
} from '@nestjs/common';
import { Public } from 'auth/auth-public';
import { merge } from 'lodash/fp';
import { CommentService } from './comment.service';
import { FindCommentParam } from './dto/comment.params.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
        return this.commentService.create(
            Object.assign(createCommentDto, {
                author: req.user.id,
            }),
        );
    }

    @Public()
    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindCommentParam) {
        return this.commentService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindCommentParam,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(params.id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param() params: FindCommentParam) {
        return this.commentService.remove(params.id);
    }
}
