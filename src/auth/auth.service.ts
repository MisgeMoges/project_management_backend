import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; // Import Response from express
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
    res: Response,
  ): Promise<{ token: string, role:string }> {
    const { firstName, lastName, email, phoneNumber, password } = signUpDto;
    const existingEmail = await this.userModel.findOne({
      email,
    });

    if (existingEmail) {
      throw new ConflictException(`User with title '${email}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });

      res.cookie('accessToken', token, {
        httpOnly: true,
        signed: true,
        secure: false,
      });
    return { token:token,role:user.role  };
  }

  async login(loginDto: LoginDto, res: Response): Promise<{ token: string, role:string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.cookie('accessToken', token, {
      httpOnly: true,
      signed: true,
      secure: false,
    });
    return { token:token, role:user.role };
  }
}
