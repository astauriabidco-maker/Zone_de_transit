// src/auth/auth.controller.ts
import {
    Body,
    Controller,
    Post,
    Res,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const { accessToken, user } = await this.authService.loginEmployee(
                email,
                password,
            );

            // 🔒 Configuration du cookie sécurisé
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // HTTPS requis en prod
                sameSite: 'strict' as const,
                maxAge: 24 * 60 * 60 * 1000, // 1 jour
                path: '/',
                domain: process.env.COOKIE_DOMAIN || undefined, // ex: .transit-logistics.com
            };

            res.cookie('access_token', accessToken, cookieOptions);

            // Ne renvoie que les données utilisateur (pas le token)
            return { user };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            domain: process.env.COOKIE_DOMAIN || undefined,
        });
        return { success: true };
    }

}