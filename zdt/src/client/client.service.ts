import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.client.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                phone: true,
                createdAt: true,
            },
        });
    }

    async create(createClientDto: CreateClientDto) {
        const { firstName, lastName, email, company, phone, address } = createClientDto;

        return this.prisma.client.create({
            data: {
                email,
                firstName,
                lastName,
                company: company || null, // ou tu peux extraire le nom de société si besoin
                phone: phone || null,
                address: address || null,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.client.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                company: true,
                phone: true,
                address: true,
                createdAt: true,
                // Tu peux aussi charger les colis si besoin :
                // parcels: true,
            },
        });
    }

    async update(id: string, updateData: UpdateClientDto) {
        const { firstName, lastName, email, company, phone, address } = updateData;

        return this.prisma.client.update({
            where: { id },
            data: {
                email,
                firstName,
                lastName,
                address: address || null,
                company: company || null,
                phone: phone || null,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.client.delete({
            where: { id },
        });
    }
}