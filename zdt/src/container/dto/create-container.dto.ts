import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ContainerLoadingStatus, ContainerUnloadingStatus } from '@prisma/client';

export class CreateContainerDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsDateString()
    departureDate?: string; // ISO string

    @IsOptional()
    @IsDateString()
    arrivalDate?: string;

    @IsEnum(ContainerLoadingStatus)
    @IsOptional()
    loadingStatus?: ContainerLoadingStatus;

    @IsEnum(ContainerUnloadingStatus)
    @IsOptional()
    unloadingStatus?: ContainerUnloadingStatus;
}