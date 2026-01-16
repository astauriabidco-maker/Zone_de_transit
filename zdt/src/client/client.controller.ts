// src/client/client.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

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

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: UpdateClientDto) {
        return this.clientService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientService.remove(id);
    }
}   