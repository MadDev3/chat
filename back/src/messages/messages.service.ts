import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message) private messageRepository: typeof Message) {}
    async create(dto: CreateMessageDto) {
        const message = await this.messageRepository.create({...dto})
        return message;
    }

    async getAllMessages() {
        const messages = await this.messageRepository.findAll();
        return messages;
    }

    async getById(idFrom: number, idTo: number) {
        const messages = await this.messageRepository.findAll({where: {idFrom} , include: {all: true}})
        const messagesTo = await this.messageRepository.findAll({where: {idTo} , include: {all: true}})
        const all = [...messages, ...messagesTo];
        all.sort((a, b) => a.id < b.id ? 1: -1);
        return all;
    }
}
