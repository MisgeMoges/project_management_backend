import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  manager: string;

  @Prop()
  employees: Array<any>;
  @Prop()
  startDate: string;
  @Prop()
  endDate: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
