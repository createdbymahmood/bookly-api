import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeRoleDto, UpdateUserDto } from './dto/update-user.dto';
import { FindUserParams } from './dto/user.params.dto';
import { Public } from 'auth/auth-public';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AuthService } from 'auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private authService: AuthService,
    ) {}

    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    profile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get()
    findAll() {
        return this.userService.findAll().populate('image');
    }

    @Public()
    @Get('/authors')
    findAuthors() {
        return this.userService.findAuthors().populate('image');
    }

    @Public()
    @Get(':id')
    findOne(@Param() params: FindUserParams) {
        return this.userService.findOne(params.id).populate('image');
    }

    @Put(':id')
    update(
        @Param() params: FindUserParams,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(params.id, updateUserDto);
    }

    @Put('/change-role/:id')
    changeRole(
        @Param() params: FindUserParams,
        @Body() changeRoleDto: ChangeRoleDto,
    ) {
        return this.userService.changeRole(params.id, changeRoleDto);
    }

    @Delete(':id')
    remove(@Param() params: FindUserParams) {
        return this.userService.remove(params.id);
    }
}
