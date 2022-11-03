import {Body, Controller, Post, Get, Param, UseGuards} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createMessage(@Body() dto: CreateMessageDto) {
        return this.messageService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.messageService.getAllMessages();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':idFrom/:idTo')
    getByEmail(@Param('idFrom') idFrom: number, @Param('idTo') idTo: number) {
        return this.messageService.getById(idFrom, idTo);
    }
}
