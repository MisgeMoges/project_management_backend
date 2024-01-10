import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { Project, ProjectSchema } from './projects/schemas/projects.schema';
import { User, UserSchema } from './users/schemas/user.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ContactModule } from './contact/contact.module';
import { Contact, ContactSchema } from './contact/schemas/contact.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),

    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
      {name:Contact.name, schema:ContactSchema}
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    AuthModule,
    UsersModule,
    ProjectsModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
