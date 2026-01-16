-- CreateEnum
CREATE TYPE "ContainerLoadingStatus" AS ENUM ('UNKNOWN', 'NOT_STARTED', 'PARTIALLY_LOADED', 'FULLY_LOADED', 'SEALED');

-- CreateEnum
CREATE TYPE "ContainerUnloadingStatus" AS ENUM ('UNKNOWN', 'NOT_STARTED', 'PARTIALLY_UNLOADED', 'FULLY_UNLOADED', 'SEALED');

-- AlterTable
ALTER TABLE "containers" ADD COLUMN     "arrivalDate" TIMESTAMP(3),
ADD COLUMN     "departureDate" TIMESTAMP(3),
ADD COLUMN     "loadingStatus" "ContainerLoadingStatus" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "unloadingStatus" "ContainerUnloadingStatus" NOT NULL DEFAULT 'UNKNOWN';
