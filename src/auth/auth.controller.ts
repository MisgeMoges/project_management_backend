import { Body, Controller, Get, Post, Req, Res, ValidationPipe ,UsePipes} from '@nestjs/common';
import { Response, Request } from 'express'; // Import Request and Response from express
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ token: string, role:string }> {
    return this.authService.signUp(signUpDto, res);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ token: string, role:string }> {
    const result = await this.authService.login(loginDto, res);
    return result;
  }
}
