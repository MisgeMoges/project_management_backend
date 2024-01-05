import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { Project } from './schemas/projects.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  async createProject(
    @Body()
    project: CreateProjectDto,
  ): Promise<Project> {
    return this.projectService.create(project);
  }

  @Get(':id')
  async getProject(
    @Param('id')
    id: string,
  ): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async updateProject(
    @Param('id')
    id: string,
    @Body()
    project: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateById(id, project);
  }
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteProject(
    @Param('id')
    id: string,
  ): Promise<Project> {
    return this.projectService.deleteById(id);
  }
}
