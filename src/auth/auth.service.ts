import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOneByEmail(email);
        console.log(user);
        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                password,
                user?.password,
            );
            if (isPasswordMatching) {
                return user;
            }
        }

        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            password: user.password,
            sub: user._id,
        };

        return {
            ...user,
            token: this.jwtService.sign(payload),
        };
    }
}
