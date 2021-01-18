import { Injectable } from '@nestjs/common';
import {
    MulterModuleOptions,
    MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    return cb(null, `${v4()}.${file.originalname}`);
                },
            }),
        };
    }
}
