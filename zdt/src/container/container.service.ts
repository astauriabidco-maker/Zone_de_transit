// src/container/container.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContainerDto } from './dto/create-container.dto';

@Injectable()
export class ContainerService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.container.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(createContainerDto: CreateContainerDto) {
        const { name, departureDate, arrivalDate, loadingStatus, unloadingStatus } = createContainerDto;

        return this.prisma.container.create({
            data: {
                name,
                departureDate: departureDate ? new Date(departureDate) : null,
                arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
                loadingStatus: loadingStatus || 'UNKNOWN',
                unloadingStatus: unloadingStatus || 'UNKNOWN',
            },
        });
    }
}