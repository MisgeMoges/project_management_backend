import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';

interface FileParams {
  fileName: string;
}

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World';
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = path.extname(file.originalname);
          const newFileName =
            file.fieldname + '-' + uniqueSuffix + fileExtension;
          cb(null, newFileName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    return 'success';
  }

  // To Serve File
  @Get('/getFile')
  getFile(@Res() res: Response, @Body() file: FileParams) {
    res.sendFile(path.join(__dirname, '../uploads/' + file.fileName));
  }
}
