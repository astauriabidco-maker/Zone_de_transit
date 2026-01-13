import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async loginEmployee(email: string, password: string) {
        // 1. Trouver l'employé
        const employee = await this.prisma.employee.findUnique({
            where: { email },
        });

        if (!employee) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        // 2. Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        // 3. Générer le token
        const payload = {
            sub: employee.id,
            email: employee.email,
            role: employee.role,
            type: 'employee', // pour distinguer plus tard
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: employee.id,
                email: employee.email,
                role: employee.role,
                firstName: employee.firstName,
                lastName: employee.lastName,
            },
        };
    }
}