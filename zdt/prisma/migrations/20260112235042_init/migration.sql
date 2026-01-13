-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('PICKER', 'LOADER', 'WAREHOUSE', 'DRIVER', 'SUPERVISOR');

-- CreateEnum
CREATE TYPE "ParcelStatus" AS ENUM ('DRAFT', 'PICKED', 'QUOTE_SIGNED', 'LOADED', 'CONTAINER_CLOSED', 'UNLOADED', 'IN_DISTRIBUTION', 'DELIVERED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PICKED', 'VIDEO_UPLOADED', 'CONTRACT_SIGNED', 'SCANNED', 'LOADED', 'CONTAINER_CLOSED', 'UNLOADED', 'DISTRIBUTION_STARTED', 'DELIVERED', 'PAYMENT_VERIFIED');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "company" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcels" (
    "id" TEXT NOT NULL,
    "status" "ParcelStatus" NOT NULL DEFAULT 'DRAFT',
    "declaredValue" DOUBLE PRECISION,
    "insured" BOOLEAN NOT NULL DEFAULT false,
    "destination" TEXT NOT NULL,
    "containerId" TEXT,
    "clientId" TEXT NOT NULL,
    "pickerId" TEXT,
    "loaderId" TEXT,
    "warehouseAgentId" TEXT,
    "driverId" TEXT,
    "supervisorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parcels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "containers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "containers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parcel_events" (
    "id" TEXT NOT NULL,
    "parcelId" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "employeeId" TEXT,
    "videoUrl" TEXT,
    "signatureUrl" TEXT,
    "comment" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parcel_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "containers_name_key" ON "containers"("name");

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "containers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_pickerId_fkey" FOREIGN KEY ("pickerId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_loaderId_fkey" FOREIGN KEY ("loaderId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_warehouseAgentId_fkey" FOREIGN KEY ("warehouseAgentId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel_events" ADD CONSTRAINT "parcel_events_parcelId_fkey" FOREIGN KEY ("parcelId") REFERENCES "parcels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel_events" ADD CONSTRAINT "parcel_events_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
