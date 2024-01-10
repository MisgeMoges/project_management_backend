import { Controller, Post, Body, Injectable } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { Contact } from './schemas/contact.schema';
@Injectable()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createUser(
    @Body()
    contact: ContactDto,
  ): Promise<Contact> {
    return this.contactService.create(contact);
  }
}
