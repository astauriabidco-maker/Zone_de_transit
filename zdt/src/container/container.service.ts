// src/container/container.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
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

    // src/container/container.service.ts
    async create(createContainerDto: CreateContainerDto) {
        // Récupère le dernier conteneur par ordre décroissant de création
        const lastContainer = await this.prisma.container.findFirst({
            orderBy: { createdAt: 'desc' },
            select: { name: true },
        });

        let nextNumber = 1;
        if (lastContainer) {
            // Extrait le numéro du nom (ex: "CONT-005" → 5)
            const match = lastContainer.name.match(/^CONT-(\d+)$/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        const name = `CONT-${nextNumber.toString().padStart(3, '0')}`;

        // Vérifie que le nom n'existe pas déjà
        const existing = await this.prisma.container.findUnique({ where: { name } });
        if (existing) {
            throw new BadRequestException('Ce nom de conteneur existe déjà');
        }

        const { departureDate, arrivalDate, loadingStatus, unloadingStatus } = createContainerDto;

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

    async getNextName() {
        const lastContainer = await this.prisma.container.findFirst({
            orderBy: { createdAt: 'desc' },
            select: { name: true },
        });

        let nextNumber = 1;
        if (lastContainer) {
            const match = lastContainer.name.match(/^CONT-(\d+)$/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        return `CONT-${nextNumber.toString().padStart(3, '0')}`;
    }
}