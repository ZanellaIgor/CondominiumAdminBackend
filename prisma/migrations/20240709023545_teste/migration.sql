/*
  Warnings:

  - Made the column `condominiumId` on table `Apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `condominiumId` on table `Maintenance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_condominiumId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_condominiumId_fkey";

-- AlterTable
ALTER TABLE "Apartment" ALTER COLUMN "condominiumId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Maintenance" ALTER COLUMN "condominiumId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_condominiumId_fkey" FOREIGN KEY ("condominiumId") REFERENCES "Condominium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
