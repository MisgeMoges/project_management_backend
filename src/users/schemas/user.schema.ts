import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;
  @Prop()
  confirmPassword: string;
  @Prop({ default: 'employee', enum: ['employee', 'manager', 'admin'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
