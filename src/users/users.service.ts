import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, {Model }from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: User): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: user.email,
    });
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException(
        `User with title '${user.email}' already exists`,
      );
    }

    const res = await this.userModel.create(user);
    return res;
  }

  async findById(requestingUserId: string, role: string, id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (requestingUserId !== id && role !=="admin") {
      throw new UnauthorizedException('Unauthorized access to user data');
    }

    return user;
  }

  async updateById(
    requestingUserId: string, role:string,
    id: string,
    user: User,
  ): Promise<User> {
    if (requestingUserId !== id && role !== 'admin') {
      throw new UnauthorizedException('Unauthorized update of user data');
    }

    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: `User with ID ${id} has been successfully deleted` };
  }
}
