import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailExists } from 'validations/CheckEmailExistance';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty({ message: 'لطفا ایمیل را وارد کنید' })
    @IsEmail({}, { message: 'فرمت ایمیل وارد شده صحیح نیست!' })
    @IsEmailExists({ message: 'ایمیل وارد شده تکراری است!' })
    email: string;

    @IsNotEmpty()
    password: string;
}
