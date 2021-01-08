import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserParams } from './dto/user.params.dto';
import { Public } from 'auth/auth-public';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Public()
    @Get('/profile/:id')
    profile() {
        return 'user profile';
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() params: FindUserParams) {
        return this.userService.findOne(params.id);
    }

    @Put(':id')
    update(
        @Param() params: FindUserParams,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(params.id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param() params: FindUserParams) {
        return this.userService.remove(params.id);
    }
}
