// src/auth/auth.controller.ts
import {
    Body,
    Controller,
    Get,
    UseGuards,
    Request,
    HttpCode,
    Post,
    Res,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
                secure: false, // OBLIGATOIRE en http
                sameSite: 'lax' as const, // ⬅️ important
                maxAge: 24 * 60 * 60 * 1000,
                path: '/'
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
            secure: false, // OBLIGATOIRE en http
            sameSite: 'lax' as const, // ⬅️ important
            path: '/'
        });
        return { success: true };
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req) {
        // Le guard a déjà vérifié le token et attaché `user` à la requête
        return { user: req.user };
    }

}