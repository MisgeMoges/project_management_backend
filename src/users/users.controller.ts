
import { Controller,Post, Body, Get, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @Get(':id')
  async getUser(@Req() req, @Param('id') id: string): Promise<User> {
    const {requestingUserId, role }= req.user;
    return this.userService.findById(requestingUserId, role, id);
  }
  @Put(':id')
  async updateUser(
    @Req() req,
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    const {requestingUserId, role} = req.user;
    return this.userService.updateById(requestingUserId, role, id, user);
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteById(id);
  }
}
