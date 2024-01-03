import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from './schemas/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: mongoose.Model<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    const projects = await this.projectModel.find();
    return projects;
  }

  async create(project: Project): Promise<Project> {
    const existingProject = await this.projectModel.findOne({
      title: project.title,
    });
    console.log(existingProject);
    if (existingProject) {
      throw new ConflictException(
        `Project with title '${project.title}' already exists`,
      );
    }

    const res = await this.projectModel.create(project);
    return res;
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    return project;
  }

  async updateById(id: string, project: Project): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, project, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<any> {
    // return await this.projectModel.findByIdAndDelete(id);

    const deletedProject = await this.projectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return {message:`Project with ID ${id} has been successfully deleted`};
  }
}
