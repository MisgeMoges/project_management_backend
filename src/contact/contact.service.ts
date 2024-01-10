import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: mongoose.Model<Contact>,
  ) {}

  async create(contact: Contact): Promise<Contact> {
    const res = await this.contactModel.create(contact);
    return res;
  }
}
