import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findOneByName(username);
        if (user?.name === username) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
