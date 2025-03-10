-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "apartamentId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "situation" SET DEFAULT 'ABERTO';

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_apartamentId_fkey" FOREIGN KEY ("apartamentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
