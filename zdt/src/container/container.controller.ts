// src/container/container.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContainerService } from './container.service';
import { CreateContainerDto } from './dto/create-container.dto';

@Controller('containers')
export class ContainerController {
    constructor(private containerService: ContainerService) { }

    @Get()
    findAll() {
        return this.containerService.findAll();
    }

    @Post()
    create(@Body() createContainerDto: CreateContainerDto) {
        return this.containerService.create(createContainerDto);
    }
}