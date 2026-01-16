// src/container/container.controller.ts
import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
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

    @Get('next-name')
    getNextName() {
        return this.containerService.getNextName();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.containerService.update(id, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.containerService.remove(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.containerService.findOne(id);
    }
}