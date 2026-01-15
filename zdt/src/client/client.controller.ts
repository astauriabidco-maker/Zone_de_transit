// src/client/client.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Param,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: string) {
        return this.clientService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }
}