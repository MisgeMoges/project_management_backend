import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { Project } from './schemas/projects.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

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
  async updateProject(
    @Param('id')
    id: string,
    @Body()
    project: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateById(id, project);
  }

  @Delete(':id')
  async deleteProject(
    @Param('id')
    id: string,
  ): Promise<Project> {
    return this.projectService.deleteById(id);
  }
}
