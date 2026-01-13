// src/auth/jwt-auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);

        if (!token) {
            throw new UnauthorizedException('Token manquant');
        }

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'my-secret-key-for-dev-only',
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Token invalide');
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.access_token;
    }
}